import React from "react";

const items = [
  {
    q: "Bu test bilimsel mi?",
    a: "Test, sinesteziye dair davranışsal ipuçlarını haritalamak için tasarlanmış deneysel bir prototip. Klinik tanı yerine, kişisel farkındalık yaratmayı hedefliyor."
  },
  {
    q: "Sonuçlarım kaydediliyor mu?",
    a: "Şu andaki prototipte hiçbir kişisel verin sunucuya gönderilmiyor veya kalıcı olarak saklanmıyor. Tüm hesaplamalar tarayıcında lokal olarak çalışıyor."
  },
  {
    q: "Testi tekrar çözebilir miyim?",
    a: "Evet. Şu anki sürümde oturum bazlı kayıt olmadığı için, istediğin kadar tekrar çözebilir ve farkı gözlemleyebilirsin."
  },
  {
    q: "Tam içerik ne zaman hazır olacak?",
    a: "İçerik ve soru seti hâlâ iterasyon halinde. Yeni sürümlerde detaylı açıklamalar, örnek senaryolar ve daha zengin görsel sorular eklenecek."
  }
];

function FAQPage() {
  return (
    <section className="hero-center">
      <div className="hero-badge">Sık Sorulan Sorular</div>
      <h2 className="hero-title">
        Testle ilgili <span className="serif">merak edilenler</span>
      </h2>
      <div
        style={{
          maxWidth: 640,
          margin: "20px auto 0",
          textAlign: "left",
          fontSize: 13,
          color: "rgba(255,255,255,0.9)"
        }}
      >
        {items.map((item) => (
          <div
            key={item.q}
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background: "rgba(3,21,32,0.75)",
              border: "1px solid rgba(255,255,255,0.12)",
              marginBottom: 10
            }}
          >
            <div style={{ fontWeight: 500, marginBottom: 6 }}>{item.q}</div>
            <div style={{ opacity: 0.9 }}>{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQPage;
