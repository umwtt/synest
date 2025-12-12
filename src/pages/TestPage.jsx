import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadTree, resolveNextId } from "../logic/behaviourTreeEngine";
import QuestionCard from "../components/ui/QuestionCard";
import { evaluateResults } from "../logic/scoring";
import { estimateProgress } from "../logic/progress";

const tree = loadTree();

function estimateRemainingQuestions(history, nodesMap) {
  // Gate’ler olduğu için bu sadece yaklaşık bir tahmin
  const visited = new Set(history);

  let count = 0;
  nodesMap.forEach((node, id) => {
    if (node.type === "question" && !visited.has(id)) {
      count += 1;
    }
  });

  return count;
}


function nextQuestionIdFrom(currentQuestionId, answers, nodesMap) {
  let safety = 0;

  const currentNode = nodesMap.get(currentQuestionId);
  if (!currentNode) return null;
  if (currentNode.type !== "question") return null;

  const currentValue = answers[currentQuestionId];
  const firstNext = resolveNextId(currentNode, currentValue, { answers, nodesMap });
  if (!firstNext) return null;

  let curId = firstNext;

  while (safety < 50) {
    safety += 1;
    const node = nodesMap.get(curId);
    if (!node) return null;

    if (node.type === "question") return curId;

    if (node.type === "gate") {
      const nextId = resolveNextId(node, null, { answers, nodesMap });
      if (!nextId) return null;
      curId = nextId;
      continue;
    }

    if (node.type === "end") return null;
    return null;
  }

  return null;
}


function ConsentDialog({ onAccept }) {
  return (
    <div className="consent-backdrop">
      <div className="consent-card">
        <div className="consent-pill">Test öncesi bilgilendirme</div>
        <h3 className="consent-title">Devam etmeden önce...</h3>
        <p className="consent-body">
          Bu prototip, sinestezi deneyimine dair kişisel farkındalığını artırmak için
          tasarlanmış deneysel bir çalışmadır. Klinik tanı veya psikolojik değerlendirme
          aracı değildir.
        </p>
        <ul className="consent-list">
          <li>Verilerin bu sürümde sunucuya gönderilmez, yalnızca tarayıcında işlenir.</li>
          <li>Rahatsız olduğun anda testi bırakabilir veya tarayıcı sekmesini kapatabilirsin.</li>
          <li>Sonuçlar “kesin doğrular” değil; duyusal eğilimlerine dair ipuçlarıdır.</li>
        </ul>
        <div className="consent-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => window.history.back()}
          >
            Geri dön
          </button>
          <button type="button" className="btn-primary" onClick={onAccept}>
            Onaylıyorum ve teste başla
          </button>
        </div>
      </div>
    </div>
  );
}

function TestPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([tree.startNodeId]);
  const [answers, setAnswers] = useState({});
  const [consentGiven, setConsentGiven] = useState(false);

  const step = history.length - 1;
  const currentId = history[step];

  const currentNode = useMemo(() => tree.nodesMap.get(currentId), [currentId]);
  const currentAnswer = answers[currentId] ?? null;

  // ✅ Progress hesapları (component içinde)
  const answeredCount = useMemo(() => {
    let c = 0;
    for (const v of Object.values(answers)) if (v != null) c += 1;
    return c;
  }, [answers]);

  const estimatedRemaining = useMemo(
    () => estimateRemainingQuestions(history, tree.nodesMap),
    [history]
  );

  const progressExact =
    answeredCount / (answeredCount + (estimatedRemaining || 0) || 1);

  function goToResult(finalAnswers) {
    const report = evaluateResults(finalAnswers, tree);

    navigate("/result", {
      state: {
        answers: finalAnswers,
        report
      }
    });
  }


  function handleSubmitAnswer() {
    if (!consentGiven) return;
    if (!currentNode || currentNode.type !== "question") return;
    const v = currentAnswer;
    if (v == null) return;
    const nodesMap = tree.nodesMap;
    const nextAnswers = { ...answers, [currentId]: v };
    const nextId = nextQuestionIdFrom(currentId, nextAnswers, nodesMap);
    if (!nextId) {
      goToResult(nextAnswers);
      return;
    }
    setAnswers(nextAnswers);
    setHistory([...history, nextId]);
 }


  function handleGoBack() {
    if (history.length <= 1) return;

    const nodesMap = tree.nodesMap;
    const lastId = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    const newAnswers = { ...answers };
    delete newAnswers[lastId];

    setHistory(newHistory);
    setAnswers(newAnswers);
  }

  function handleChangeAnswer(value) {
    if (!currentNode || currentNode.type !== "question") return;
    setAnswers((prev) => ({ ...prev, [currentId]: value }));
  }

  if (!currentNode) {
    return (
      <section className="hero-center">
        <p>Test yüklenirken bir hata oluştu.</p>
      </section>
    );
  }

  return (
    <section className="hero-center" style={{ marginTop: 16 }}>
      <div className="hero-badge">Sinestezi Testi · adım {step + 1}</div>

      <h2 className="hero-title">
        Duyuların <span className="serif">birbirine karışırken</span>
      </h2>

      <p className="hero-sub">
        Her soruda dürüst olman, sonuçların anlamlı olması için kritik. Yanıtların,
        duyusal algı örüntülerini çözen bir davranış ağacına işleniyor.
      </p>

      {/* Progress'i onaydan sonra göstermek daha temiz */}
      {consentGiven && (
        <div className="test-progress">
          <div className="test-progress-track">
            <div
              className="test-progress-exact"
              style={{ width: `${Math.min(progressExact * 100, 100)}%` }}
            />
            <div
              className="test-progress-estimate"
              style={{ width: `${Math.min((progressExact + 0.12) * 100, 100)}%` }}
            />
          </div>

          <div className="test-progress-meta">
            <span>{answeredCount} soru yanıtlandı</span>
            <span>≈ {estimatedRemaining} soru kaldı</span>
          </div>
        </div>
      )}

      {consentGiven && currentNode.type === "question" && (
        <>
          <QuestionCard
            node={currentNode}
            value={currentAnswer}
            onChange={handleChangeAnswer}
            index={step}
          />

          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <button
              type="button"
              className="btn-secondary"
              disabled={history.length <= 1}
              onClick={handleGoBack}
            >
              Önceki soru
            </button>

            <button
              type="button"
              className="btn-primary"
              disabled={currentAnswer == null}
              onClick={handleSubmitAnswer}
            >
              Devam Et
            </button>
          </div>
        </>
      )}

      {!consentGiven && <ConsentDialog onAccept={() => setConsentGiven(true)} />}
    </section>
  );
}

export default TestPage;
