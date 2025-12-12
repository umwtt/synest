const MODULES = [
  "grapheme_color",
  "sound_color",
  "time_space",
  "sound_taste_smell",
  "mirror_touch",
  "person_color_shape",
  "taste_color_shape",
  "smell_color_shape",
  "emotion_color_shape",
  "misophonia"
];

export function createEmptyScores() {
  const modules = {};
  MODULES.forEach((m) => {
    modules[m] = {
      coreSum: 0,
      coreN: 0,
      filterSum: 0,
      filterN: 0
    };
  });
  return { modules };
}

export function accumulateScore(scores, node, value) {
  if (!node || node.type !== "question") return scores;
  const mod = node.module;
  if (!mod || !scores.modules[mod]) return scores;

  const next = {
    modules: {
      ...scores.modules,
      [mod]: { ...scores.modules[mod] }
    }
  };

  if (node.role === "filter") {
    next.modules[mod].filterSum += value;
    next.modules[mod].filterN += 1;
  } else {
    next.modules[mod].coreSum += value;
    next.modules[mod].coreN += 1;
  }

  return next;
}

export function computeModuleSummary(modScore) {
  const coreAvg =
    modScore.coreN > 0 ? modScore.coreSum / modScore.coreN : null;
  const filterAvg =
    modScore.filterN > 0 ? modScore.filterSum / modScore.filterN : null;

  // basit seviye etiketleme
  const level =
    coreAvg == null
      ? "veri yok"
      : coreAvg >= 1.25
      ? "güçlü"
      : coreAvg >= 0.6
      ? "orta"
      : "zayıf";

  return { coreAvg, filterAvg, level };
}


// scoring.js

export function buildProfile(scores) {
  const modules = scores?.modules ?? {};

  // Modül özetlerini çıkar
  const moduleSummary = Object.fromEntries(
    Object.entries(modules).map(([key, ms]) => [key, computeModuleSummary(ms)])
  );

  // En güçlü 3 sinyali seç (coreAvg'a göre)
  const ranked = Object.entries(moduleSummary)
    .map(([k, v]) => ({ key: k, ...v }))
    .filter((x) => x.coreAvg != null)
    .sort((a, b) => (b.coreAvg ?? -999) - (a.coreAvg ?? -999));

  const top = ranked.slice(0, 3);

  const headline =
    top.length === 0
      ? "Profilin hazırlanıyor"
      : `En baskın sinyal: ${top[0].key.replaceAll("_", " ")}`;

  const summary =
    top.length === 0
      ? "Yeterli veri yok. Testi tamamladığında, modül bazlı bir özet göreceksin."
      : "Yanıtlarına göre bazı modüllerde daha belirgin çağrışım sinyalleri görünüyor. Aşağı kaydırdıkça bunun ne anlama geldiğini açıklıyoruz.";

  // ResultPage tags.map patlamasın diye her zaman array
  const tags = top.length
    ? top.map((t) => `${t.key.replaceAll("_", " ")}: ${t.level}`)
    : [];

  // StatsChart için basit bir seri: {label,value}
  const rawScores = Object.entries(moduleSummary).map(([k, v]) => ({
    label: k.replaceAll("_", " "),
    value: v.coreAvg ?? 0
  }));

  return {
    headline,
    summary,
    tags,
    rawScores,
    modules: moduleSummary
  };
}
