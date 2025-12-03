import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadTree, getNextNodeId } from "../logic/behaviourTreeEngine";
import {
  createEmptyScores,
  accumulateScore
} from "../logic/scoring";
import QuestionCard from "../components/ui/QuestionCard";

const tree = loadTree();

function recomputeScoresFromAnswers(historyIds, answers, nodesMap) {
  let acc = createEmptyScores();
  historyIds.forEach((id) => {
    const node = nodesMap.get(id);
    const value = answers[id];
    if (node && node.type === "question" && value != null) {
      acc = accumulateScore(acc, node, value);
    }
  });
  return acc;
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
          <li>
            Rahatsız olduğun anda testi bırakabilir veya tarayıcı sekmesini kapatabilirsin.
          </li>
          <li>
            Sonuçlar &quot;kesin doğrular&quot; değil; duyusal eğilimlerine dair ipuçlarıdır.
          </li>
        </ul>
        <div className="consent-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => window.history.back()}
          >
            Geri dön
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={onAccept}
          >
            Onaylıyorum ve teste başla
          </button>
        </div>
      </div>
    </div>
  );
}

function TestPage() {
  const navigate = useNavigate();

  // Soru akışı
  const [history, setHistory] = useState([tree.startNodeId]); // sıra ile soru id'leri
  const [answers, setAnswers] = useState({}); // { [questionId]: value }
  const [scores, setScores] = useState(createEmptyScores());
  const [consentGiven, setConsentGiven] = useState(false);

  const currentId = history[history.length - 1];
  const currentNode = useMemo(
    () => tree.nodesMap.get(currentId),
    [currentId]
  );
  const currentAnswer = answers[currentId] ?? null;
  const step = history.length - 1;

  function goToResult(finalScores, finalAnswers) {
    navigate("/result", {
      state: {
        scores: finalScores,
        answers: finalAnswers
      }
    });
  }

  function handleSubmitAnswer() {
    if (!consentGiven) return;
    if (!currentNode || currentNode.type !== "question") return;
    if (currentAnswer == null) return;

    const nodesMap = tree.nodesMap;

    // Mevcut history + cevaplarla skoru baştan hesapla
    const baseScores = recomputeScoresFromAnswers(history, answers, nodesMap);

    const nextId = getNextNodeId(currentNode, currentAnswer);
    const nextNode = nextId ? nodesMap.get(nextId) : null;

    if (!nextNode || nextNode.type === "end") {
      // Akış burada bitiyor, elindeki cevaplarla skoru yeniden hesapla ve sonuç sayfasına git
      const finalScores = recomputeScoresFromAnswers(history, answers, nodesMap);
      goToResult(finalScores, answers);
      return;
    }

    // Devam eden soru: yeni history'ye nextId'yi ekle ve skoru tekrar hesapla
    const newHistory = [...history, nextId];
    const newScores = recomputeScoresFromAnswers(newHistory, answers, nodesMap);

    setHistory(newHistory);
    setScores(newScores);
  }

  function handleGoBack() {
    if (history.length <= 1) return;

    const nodesMap = tree.nodesMap;
    const lastId = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    const newAnswers = { ...answers };
    delete newAnswers[lastId];

    const newScores = recomputeScoresFromAnswers(newHistory, newAnswers, nodesMap);

    setHistory(newHistory);
    setAnswers(newAnswers);
    setScores(newScores);
  }

  function handleChangeAnswer(value) {
    if (!currentNode || currentNode.type !== "question") return;
    const updatedAnswers = {
      ...answers,
      [currentId]: value
    };
    setAnswers(updatedAnswers);
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
      <div className="hero-badge">
        Sinestezi Testi · adım {step + 1}
      </div>
      <h2 className="hero-title">
        Duyuların <span className="serif">birbirine karışırken</span>
      </h2>
      <p className="hero-sub">
        Her soruda dürüst olman, sonuçların anlamlı olması için kritik. Yanıtların,
        duyusal algı örüntülerini çözen bir davranış ağacına işleniyor.
      </p>

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

      {!consentGiven && (
        <ConsentDialog onAccept={() => setConsentGiven(true)} />
      )}
    </section>
  );
}

export default TestPage;
