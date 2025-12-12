import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const report = location.state?.report;

  if (!report) {
    return (
      <section className="sini-hero">
        <div className="sini-kicker">Sinipalet</div>
        <h2 className="sini-title">Sonuç bulunamadı</h2>
        <p className="sini-sub">
          Bu sayfaya doğrudan gelmiş olabilirsin veya test akışı yarıda kesilmiş olabilir.
        </p>
        <div style={{ marginTop: 18 }}>
          <button className="btn-primary" onClick={() => navigate("/test")}>
            Teste dön
          </button>
        </div>
      </section>
    );
  }

  const { meta, dominant, secondary, absent, byModule } = report;

  return (
    <section className="hero-center" style={{ marginTop: 28 }}>
      <div className="hero-badge">Sinipalet · Kişisel Özet</div>

      <h2 className="hero-title">
        Duyusal Paletin Şekillendi
      </h2>

      <p className="hero-sub">
        Yanıt örüntülerine göre zihninin bazı duyusal eşleşmelere diğerlerinden
        daha açık olduğu görülüyor.
      </p>

      {/* === SAHNE 1: META === */}
      <div className="result-panel">
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Test Özeti</div>
        <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13 }}>
          <li>Yanıtlanan ana soru: {meta.answeredMain}</li>
          <li>Yanıtlanan filtre sorusu: {meta.answeredFilter}</li>
          <li>Güvenirlik düzeyi: {meta.reliability}</li>
        </ul>
      </div>

      {/* === SAHNE 2: DOMINANT === */}
      {dominant.length > 0 && (
        <div className="result-panel" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>
            Baskın Duyusal Eğilimler
          </div>

          {dominant.map((m) => (
            <div key={m.moduleId} className="sini-card" style={{ marginBottom: 8 }}>
              <strong>{m.title}</strong>
              <div style={{ fontSize: 13, opacity: 0.8 }}>
                Filtre skoru: {m.filterScore} · Güven: {m.confidence}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === SAHNE 3: SECONDARY === */}
      {secondary.length > 0 && (
        <div className="result-panel" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>
            İkincil / Belirsiz Eğilimler
          </div>

          {secondary.map((m) => (
            <div key={m.moduleId} className="sini-card" style={{ marginBottom: 8 }}>
              <strong>{m.title}</strong>
              <div style={{ fontSize: 13, opacity: 0.8 }}>
                Bu eğilim tutarlı fakat filtre eşiğini tam karşılamıyor.
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === SAHNE 4: ABSENT === */}
      {absent.length > 0 && (
        <div className="result-panel" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>
            Bu Testte Baskın Görünmeyenler
          </div>

          {absent.map((m) => (
            <div key={m.moduleId} className="sini-card" style={{ marginBottom: 6 }}>
              <strong>{m.title}</strong>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Bu duyusal eşleşme, verdiğin yanıtlarla güçlü biçimde örtüşmedi.
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === ALT BİLGİ === */}
      <div style={{ marginTop: 18, fontSize: 11, opacity: 0.7 }}>
        Bu ekran prototip amaçlıdır. Klinik tanı değildir.
      </div>

      <div style={{ marginTop: 22 }}>
        <button className="btn-primary" onClick={() => navigate("/test")}>
          Testi Tekrarla
        </button>
      </div>
    </section>
  );
}

export default ResultPage;
