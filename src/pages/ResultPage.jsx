import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildProfile } from "../logic/scoring";
import StatsChart from "../components/ui/StatsChart";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, answers } = location.state || {};

  if (!scores) {
    return (
      <section className="hero-center">
        <p>Henüz bir test sonucu yok. Önce testi tamamla.</p>
        <div style={{ marginTop: 16 }}>
          <button className="btn-primary" onClick={() => navigate("/test")}>
            Teste Git
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
          {profile.tags.map((tag) => (
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
