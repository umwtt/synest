import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="sini-hero">
      {/* Arka plan akışı (CSS-only) */}
      <div className="sini-bg" />

      <div className="sini-kicker">Sinipalet · pastel, sakin, deneysel</div>

      <h1 className="sini-title">
        We map your <span className="soft">inner palette</span>
      </h1>

      <p className="sini-sub">
        Bu çalışma, algı örüntülerini ve duyusal tercihleri ölçmek için tasarlanmış
        deneysel bir test prototipidir. Girişte sinesteziyi ayrıntılı anlatmıyoruz;
        bu, test yanıtlarını yönlendirebilir.
      </p>

      <div style={{ marginTop: 22 }}>
        <button className="btn-primary" onClick={() => navigate("/test")}>
          Teste Başla
        </button>
      </div>

      <div className="sini-grid">
        <div className="sini-card">
          <h3>Bu sayfada ne var?</h3>
          <p>
            Projenin amacı, etik çerçevesi ve test deneyimi. Sonuç ekranında ise
            daha derin bir “bilgi yolculuğu” başlıyor.
          </p>
          <div className="sini-chiprow">
            <span className="sini-chip">Kayıt yok</span>
            <span className="sini-chip">Yerel hesaplama</span>
            <span className="sini-chip">Araştırma odaklı</span>
          </div>
        </div>

        <div className="sini-card">
          <h3>Gizlilik (kısa)</h3>
          <p>
            Bu prototipte yanıtlar sunucuya gönderilmez. Sonuçlar tanı değildir.
            Rahatsız olursan testi istediğin an bırakabilirsin.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
