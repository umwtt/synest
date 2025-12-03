import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="hero-center">
      <div className="hero-badge">
        1.335 kişi bekleme listesinde · Sinestezi & kişilik keşfi
      </div>
      <h1 className="hero-title">
        Clarity in <span className="serif">Synesthesia</span>
      </h1>
      <p className="hero-sub">
        Duyuların iç içe geçtiği dünyanda, davranış kalıplarınla sinestezik
        algını ilişkilendiren minimal bir test. Gürültüyü sadeleştir, kendini
        netleştir.
      </p>
      <div className="hero-cta">
        <button className="btn-primary" onClick={() => navigate("/test")}>
          Teste Başla
        </button>
      </div>

      {/* Aşağı kaydıkça birbirinin üzerine kayan kartlar */}
      <div className="home-stack">
        <article className="home-card">
          <h3 className="home-card-title">Sinestezinin Bilimsel Tanımı</h3>
          <p className="home-card-body">
            Sinestezi, bir duyusal uyaranın aynı anda birden fazla duyusal
            deneyimi tetiklediği nörolojik bir fenomendir. Örneğin bazı
            kişiler için sesler otomatik olarak renklerle, harfler belirli
            tonlarla veya sayılar belirli mekânsal konumlarla eşleşebilir.
          </p>
          <p className="home-card-body">
            Bu durum, hayal etme veya bilinçli çağrışım kurmaktan farklı olarak,
            genellikle öngörülebilir ve tekrarlanabilir bir algısal örüntüye
            sahiptir. Literatürde sinestezi; nörogörüntüleme, psikofizik ve
            bilişsel psikoloji çalışmalarıyla incelenmektedir.
          </p>
        </article>

        <article className="home-card">
          <h3 className="home-card-title">Projemizin Amacı & Emeği Geçenler</h3>
          <p className="home-card-body">
            Bu proje, sinesteziyi salt ilginç bir fenomen olarak sunmak yerine,
            kişisel deneyimi anlamlandırmaya yardımcı bir çerçeve önermeyi
            amaçlıyor. Test, duyusal hassasiyetini ve olası sinestezik
            eğilimlerini keşfetmen için davranış temelli bir haritalama yapar.
          </p>
          <p className="home-card-body">
            Soru setleri, arayüz tasarımı ve kavramsal model; farklı
            disiplinlerden bir ekibin ortak çalışmasıyla geliştiriliyor:
            bilişsel bilim, yazılım geliştirme, kullanıcı deneyimi ve görsel
            tasarım. İçerik tarafı hâlâ iterasyon aşamasında olduğundan, bazı
            bölümler prototip niteliğinde yerleştirilmiştir.
          </p>
          <p className="home-card-body">
            İlerleyen sürümlerde, katkıda bulunan ekip üyeleri ve danışman
            akademisyenler bu alanda detaylı olarak listelenecektir.
          </p>
        </article>

        <article className="home-card">
          <h3 className="home-card-title">Kaynakça & İlham Aldığımız Çalışmalar</h3>
          <p className="home-card-body">
            Bu prototip, sinestezi ve duyusal entegrasyon literatüründeki pek
            çok çalışmadan kavramsal olarak besleniyor. Tam akademik kaynakça,
            içerik ekibinin çalışması tamamlandığında burada yer alacak.
          </p>
          <ul className="home-card-list">
            <li>Sinestezi üzerine klasik nörogörüntüleme çalışmaları</li>
            <li>Duyusal hassasiyet ve nöroçeşitlilik odaklı ölçekler</li>
            <li>Davranış ağacı (behaviour tree) tabanlı test tasarımı yaklaşımları</li>
          </ul>
          <p className="home-card-body">
            Şu anki metin; gerçek referans listesinin yerleşeceği alanı temsil
            eden, tasarım odaklı bir ön yer tutucu (placeholder) işlevi görür.
          </p>
        </article>

        <article className="home-card">
          <h3 className="home-card-title">İletişim & Geri Bildirim</h3>
          <p className="home-card-body">
            Prototip üzerinde geri bildirim paylaşmak, olası işbirlikleri veya
            araştırma projeleri hakkında konuşmak istersen bize ulaşabilirsin.
          </p>
          <div className="home-contact-block">
            <div className="home-contact-row">
              <span className="home-contact-label">E-posta</span>
              <span className="home-contact-value">
                contact@synesthesia-lab.example
              </span>
            </div>
            <div className="home-contact-row">
              <span className="home-contact-label">Öncelik</span>
              <span className="home-contact-value">
                Araştırma işbirlikleri · Kullanıcı geri bildirimi · Etik değerlendirme
              </span>
            </div>
          </div>
          <p className="home-card-body home-card-footnote">
            Bu iletişim bilgileri şu an için örnek niteliğindedir. Gerçek
            prodüksiyon ortamında, hukuki ve kurumsal yapıya uygun resmi
            kanallar tanımlanacaktır.
          </p>
        </article>
      </div>
    </section>
  );
}

export default HomePage;
