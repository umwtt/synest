import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildProfile } from "../logic/scoring";
import StatsChart from "../components/ui/StatsChart";
import { computeModuleSummary } from "../logic/scoring";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const scores = location.state?.scores;
  const answers = location.state?.answers;

  if (!scores || !answers) {
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
  const profile = buildProfile(scores);

  return (
    <section className="hero-center" style={{ marginTop: 28 }}>
      <div className="hero-badge">Sinestezi Profili</div>
      <h2 className="hero-title">{profile.headline}</h2>
      <p className="hero-sub">{profile.summary}</p>

      <div className="result-panel">
        <div style={{ marginBottom: 10, fontWeight: 500 }}>Hap Bilgiler</div>
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {(profile.tags ?? []).map((tag) => (
            <li key={tag} style={{ marginBottom: 4 }}>
              {tag}
            </li>
          ))}
          <li>
            Günlük hayatında seni en çok yoran veya heyecanlandıran duyusal
            durumları not ederek, hangi bağlamlarda algının zirve yaptığını
            gözlemleyebilirsin.
          </li>
        </ul>

        <StatsChart scores={profile.rawScores} />

              <div className="result-panel" style={{ marginTop: 18 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Bilgi Yolculuğu</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>
          Aşağı kaydırdıkça; kavramı, araştırma yöntemlerini ve bu sonuçların ne anlama
          geldiğini katman katman göreceksin.
        </div>
      </div>

      <div className="result-panel" style={{ marginTop: 14 }}>
  <div style={{ fontWeight: 600, marginBottom: 10 }}>Modül Özeti</div>

  <div style={{ display: "grid", gap: 10 }}>
    {Object.entries(scores.modules).map(([key, ms]) => {
      const s = computeModuleSummary(ms);
      return (
        <div
          key={key}
          style={{
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: "10px 12px",
            display: "flex",
            justifyContent: "space-between",
            gap: 10
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{key}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>
              Core: {s.coreAvg == null ? "—" : s.coreAvg.toFixed(2)} · Filter:{" "}
              {s.filterAvg == null ? "—" : s.filterAvg.toFixed(2)}
            </div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.9, alignSelf: "center" }}>
            {s.level}
          </div>
        </div>
      );
    })}
  </div>
</div>


      <div style={{ maxWidth: 720, margin: "16px auto 0", textAlign: "left" }}>
        <section className="sini-card" style={{ marginBottom: 12 }}>
          <h3>Sinestezi nedir?</h3>
          <p>
            Bazı kişilerde bir duyusal uyaran (ör. ses) başka bir duyusal deneyimi
            (ör. renk) otomatik biçimde tetikleyebilir. Bu, bilinçli “hayal etme”den
            farklı olabilir.
          </p>
        </section>

        <section className="sini-card" style={{ marginBottom: 12 }}>
          <h3>Nasıl araştırılıyor?</h3>
          <p>
            Davranış testleri, tutarlılık ölçümleri, psikofizik deneyler ve bazı
            çalışmalarda nörogörüntüleme yöntemleriyle incelenir. Araştırma tasarımında
            “önyükleme etkisi” önemli bir risk olduğu için, girişte sınırlı bilgi veriyoruz.
          </p>
        </section>

        <section className="sini-card" style={{ marginBottom: 12 }}>
          <h3>Bu sonuçlar ne değildir?</h3>
          <p>
            Klinik tanı değildir. Buradaki çıktı, yanıtlarının istatistiksel bir
            özetidir ve kişisel farkındalık amacı taşır.
          </p>
        </section>

        <section className="sini-card" style={{ marginBottom: 12 }}>
          <h3>Sonraki adım</h3>
          <p>
            İstersen testi birkaç gün arayla tekrar çözerek cevaplarının ne kadar
            stabil kaldığını gözlemleyebilirsin. Stabilite, araştırma açısından güçlü bir sinyaldir.
          </p>
        </section>
      </div>


        <div
          style={{
            marginTop: 14,
            fontSize: 11,
            opacity: 0.7
          }}
        >
          Bu ekran, prototip amaçlıdır. Sonuçların kaydedilmez; tarayıcı
          sekmesini kapattığında veriler sıfırlanır.
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <button className="btn-primary" onClick={() => navigate("/test")}>
          Tekrar Dene
        </button>
      </div>
    </section>
  );
}

export default ResultPage;
