// src/logic/scoring.js

// answers: { [questionId]: 0..4 }
// tree: { nodesMap, modules }
// return: sonuç datası
export function evaluateResults(answers, tree) {
  const { nodesMap, modules } = tree;

  const byModule = {};
  const allQuestionIds = Object.keys(answers);

  // 1) init
  for (const [moduleId, def] of Object.entries(modules || {})) {
    byModule[moduleId] = {
      moduleId,
      title: def.title ?? moduleId,
      thresholds: {
        mainGateMin: def.mainGateMin,
        filterResultMin: def.filterResultMin,
        filterPseudoMax: def.filterPseudoMax
      },

      // raw scores
      mainScore: 0,
      filterScore: 0,

      // max possible (answered subset değil, teorik)
      mainMax: 0,
      filterMax: 0,

      // state
      filterOpened: false,
      classification: "none", // "synesthetic" | "pseudo" | "none"
      confidence: "low", // "high" | "medium" | "low"

      // diagnostics
      answeredMainCount: 0,
      answeredFilterCount: 0
    };
  }

  // 2) compute max possible per module (tree'deki node'lardan)
  for (const node of nodesMap.values()) {
    if (!node || node.type !== "question") continue;
    const m = byModule[node.module];
    if (!m) continue;

    // 5'li likert => max 4 varsayıyoruz (scales değişirse burayı parametrize ederiz)
    const maxPerQ = 4;

    if (node.phase === "main") m.mainMax += maxPerQ;
    if (node.phase === "filter") m.filterMax += maxPerQ;
  }

  // 3) sum raw scores from answers
  for (const qid of allQuestionIds) {
    const value = answers[qid];
    const node = nodesMap.get(qid);
    if (!node || node.type !== "question") continue;
    const m = byModule[node.module];
    if (!m) continue;

    if (node.phase === "main") {
      m.mainScore += value;
      m.answeredMainCount += 1;
    } else if (node.phase === "filter") {
      m.filterScore += value;
      m.answeredFilterCount += 1;
    }
  }

  // 4) classify each module using normalized thresholds
for (const m of Object.values(byModule)) {
  const mainRatio =
    m.mainMax > 0 ? m.mainScore / m.mainMax : 0;

  const filterRatio =
    m.filterMax > 0 ? m.filterScore / m.filterMax : 0;

  m.mainRatio = mainRatio;
  m.filterRatio = filterRatio;

  // Gate: ana skor yeterli mi?
  if (mainRatio < 0.65) {
    m.filterOpened = false;
    m.classification = "none";
    m.confidence = "low";
    continue;
  }

  m.filterOpened = true;

  // Filtre yoksa (bazı modüller)
  if (m.filterMax === 0) {
    m.classification = "synesthetic";
    m.confidence = "medium";
    continue;
  }

  if (filterRatio >= 0.7) {
    m.classification = "synesthetic";
    m.confidence = "high";
  } else {
    m.classification = "pseudo";
    m.confidence = "medium";
  }
}


  // 5) build summaries
  const modulesArr = Object.values(byModule);

  const dominant = modulesArr
    .filter((m) => m.classification === "synesthetic")
    .sort((a, b) => b.filterScore - a.filterScore);

  const secondary = modulesArr
    .filter((m) => m.classification === "pseudo")
    .sort((a, b) => b.filterScore - a.filterScore);

  const absent = modulesArr
    .filter((m) => m.classification === "none")
    .sort((a, b) => b.mainScore - a.mainScore);

  // 6) global meta
  const meta = computeMeta(modulesArr);

  return {
    meta,
    byModule,
    modulesArr,
    dominant,
    secondary,
    absent
  };
}

function computeMeta(modulesArr) {
  // Basit ama işe yarar “güvenirlik/yoğunluk” metrikleri
  const answeredMain = modulesArr.reduce((s, m) => s + m.answeredMainCount, 0);
  const answeredFilter = modulesArr.reduce((s, m) => s + m.answeredFilterCount, 0);

  const synCount = modulesArr.filter((m) => m.classification === "synesthetic").length;
  const pseudoCount = modulesArr.filter((m) => m.classification === "pseudo").length;

  const intensityRaw =
    modulesArr.reduce((s, m) => s + m.mainScore + m.filterScore, 0);

  // Normalize: teorik max’a böl (0..1)
  const maxRaw =
    modulesArr.reduce((s, m) => s + m.mainMax + m.filterMax, 0) || 1;

  const intensity = intensityRaw / maxRaw;

  const reliability =
    answeredMain >= 10 ? (answeredFilter > 0 ? "high" : "medium") : "low";

  return {
    answeredMain,
    answeredFilter,
    synCount,
    pseudoCount,
    intensity, // 0..1
    reliability
  };
}
