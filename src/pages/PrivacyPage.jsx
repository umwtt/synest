import React from "react";

function PrivacyPage() {
  return (
    <section className="hero-center">
      <div className="hero-badge">KVKK & Veri Koruma</div>
      <h2 className="hero-title">
        Verilerin <span className="serif">şimdilik</span> sadece sende
      </h2>
      <div
        style={{
          maxWidth: 680,
          margin: "18px auto 0",
          textAlign: "left",
          fontSize: 13,
          color: "rgba(255,255,255,0.9)",
          background: "rgba(3,21,32,0.85)",
          borderRadius: 20,
          padding: "18px 20px",
          border: "1px solid rgba(255,255,255,0.16)"
        }}
      >
        <p style={{ marginTop: 0 }}>
          Bu prototip sürümde, test cevapların yalnızca tarayıcı belleğinde
          tutulur ve hiçbir şekilde sunucuya iletilmez, kaydedilmez veya
          analiz amaçlı depolanmaz.
        </p>
        <p>
          Gelecekteki sürümlerde, 6698 sayılı Kişisel Verilerin Korunması
          Kanunu&apos;na uygun detaylı aydınlatma metni, açık rıza
          mekanizmaları ve verilerin nasıl işlendiğine dair şeffaf açıklamalar
          burada yer alacaktır.
        </p>
        <p style={{ opacity: 0.8 }}>
          Şu an okuduğun metin, gerçek KVKK dokümanı için geçici bir Lorem ipsum
          niteliğindedir ve yalnızca tasarım testi için kullanılır.
        </p>
      </div>
    </section>
  );
}

export default PrivacyPage;
