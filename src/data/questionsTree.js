// src/data/questionsTree.js
// Sinipalet Anket Modeli (DOCX'e göre)
// Likert 0-3:
// 0 = Bana hiç uymuyor
// 1 = Biraz uyuyor
// 2 = Genellikle uyuyor
// 3 = Tamamen uyuyor

const SCALE_LIKERT_0_4 = {
  id: "likert_0_4",
  min: 0,
  max: 4,
  leftLabel: "Bana hiç uymuyor",
  rightLabel: "Tamamen uyuyor"
};

// Helper: Question node
const Q = (id, module, phase, prompt, nextId) => ({
  id,
  type: "question",
  module,
  phase, // "main" | "filter"
  prompt,
  // UI uyumluluğu için alias:
  text: prompt,
  question: prompt,
  scale: SCALE_LIKERT_0_4.id,
  next: nextId ? [{ type: "direct", nextId }] : []
});

// Helper: Gate node (module score based)
// condition: moduleScore(module, phase) >= min
const G = (id, module, phase, min, thenId, elseId) => ({
  id,
  type: "gate",
  condition: { type: "moduleScoreGte", module, phase, min },
  then: thenId,
  else: elseId
});

export const questionsTree = {
  meta: {
    project: "Sinipalet",
    version: "2025-12-13",
    scoring: "module + phase (main/filter), likert 0-3",
    disclaimer:
      "Bu ölçek tarama/öz-bildirim amaçlıdır; klinik tanı aracı değildir. Sonuçlar 'bulgu' düzeyinde yorumlanmalıdır."
  },

  scales: {
    [SCALE_LIKERT_0_4.id]: SCALE_LIKERT_0_4
  },

  // DOCX değerlendirme ölçütlerinden alınan eşikler
  // Not: 'filterResultMin' sonuç sayfasında yorumlamak için kullanılır.
  modules: {
    grapheme_color: {
      title: "Grafem–Renk",
      mainGateMin: 8, // S1-S4 toplamı 8-12 arası -> filtre açılır (biz >=8 kullanıyoruz)
      filterResultMin: 4, // filtre >=4 => sinestezik bulgu, 0-4 => psödösinestezik
      filterPseudoMax: 4
    },
    sound_color: {
      title: "Ses–Renk/Şekil",
      mainGateMin: 6,
      filterResultMin: 4,
      filterPseudoMax: 4
    },
    time_space: {
      title: "Hafta–Gün / Zaman–Konum",
      mainGateMin: 6,
      filterResultMin: 6, // DOCX: filtre 6+ sinestezik, 0-6 psödo
      filterPseudoMax: 6
    },
    sound_taste_smell: {
      title: "Ses–Tat/Koku",
      mainGateMin: 6,
      filterResultMin: 4,
      filterPseudoMax: 4
    },
    mirror_touch: {
      title: "Ayna Dokunma",
      mainGateMin: 6,
      filterResultMin: 6, // DOCX: filtre 6+ sinestezik, 0-6 psödo
      filterPseudoMax: 6
    },
    person_color: {
      title: "Kişi–Renk/Şekil",
      mainGateMin: 6,
      filterResultMin: 4,
      filterPseudoMax: 4
    },
    taste_color: {
      title: "Tat–Renk/Şekil",
      mainGateMin: 6,
      filterResultMin: 4,
      filterPseudoMax: 4
    },
    smell_color: {
      title: "Koku–Renk/Şekil",
      mainGateMin: 6,
      filterResultMin: 4,
      filterPseudoMax: 4
    },
    emotion_color: {
      title: "Duygu–Renk/Şekil",
      mainGateMin: 6,
      filterResultMin: 4,
      filterPseudoMax: 4
    },
    misophonia: {
      title: "Mizofoni",
      mainGateMin: 4, // DOCX: ana sorular 4+ ise filtre
      filterResultMin: 4,
      filterPseudoMax: 4
    }
  },

  startNodeId: "S1",

  nodes: [
    // 1) Grafem–Renk (S1–S4 main, S5–S6 filter)
    Q(
      "S1",
      "grapheme_color",
      "main",
      "Belirli harfleri gördüğümde aklımda otomatik olarak belirli renkler canlanır.",
      "S2"
    ),
    Q(
      "S2",
      "grapheme_color",
      "main",
      "Belirli rakamları her zaman aynı renklerle ilişkilendiririm.",
      "S3"
    ),
    Q(
      "S3",
      "grapheme_color",
      "main",
      "Yazılı bir metne baktığımda bazı kelimeler ya da harfler gözüme “renkli gibi” gelir.",
      "S4"
    ),
    Q(
      "S4",
      "grapheme_color",
      "main",
      "Rakamları veya harfleri farklı netlik, parlaklık veya belirginlik derecelerinde görürüm.",
      "G_grapheme_filter"
    ),
    G("G_grapheme_filter", "grapheme_color", "main", 8, "S5", "S7"),
    Q(
      "S5",
      "grapheme_color",
      "filter",
      "Bu renk algısını tekrarlı ve tutarlı bir biçimde yaşarım.",
      "S6"
    ),
    Q(
      "S6",
      "grapheme_color",
      "filter",
      "Renk deneyimim bilincimden bağımsız(düşünmeksizin), kendiliğinden oluşur.",
      "S7"
    ),

    // 2) Ses–Renk (S7–S9 main, S10–S11 filter)
    Q(
      "S7",
      "sound_color",
      "main",
      "Duyduğum bazı sesler (kapı sesi, motor sesi, zil sesi vb.) zihnimde belirli renklerle eşleşir.",
      "S8"
    ),
    Q(
      "S8",
      "sound_color",
      "main",
      "Müzik dinlerken belirli renk geçişleri veya ışık dalgaları gibi görsel hisler yaşarım.",
      "S9"
    ),
    Q(
      "S9",
      "sound_color",
      "main",
      "Biri konuştuğunda, sesinin tonuna bağlı olarak zihnimde renk veya parlaklık değişimleri olur.",
      "G_soundcolor_filter"
    ),
    G("G_soundcolor_filter", "sound_color", "main", 6, "S10", "S12"),
    Q(
      "S10",
      "sound_color",
      "filter",
      "Bu deneyimleri zaman içerisinde tekrar tekrar yaşarım.",
      "S11"
    ),
    Q(
      "S11",
      "sound_color",
      "filter",
      "Yaşadığım bu deneyimler geçmişte yaşadığım bir anısal bağdaştırma veya öğrenimden ziyade kendiliğinden ve otomatiktir.",
      "S12"
    ),

    // 3) Hafta–Gün / Zaman–Konum (S12–S14 main, S15–S17 filter)
    Q(
      "S12",
      "time_space",
      "main",
      "Haftanın günlerini düşündüğümde onları zihnimde belirli bir düzende (çember, çizgi vb.) yerleştirilmiş olarak görürüm.",
      "S13"
    ),
    Q(
      "S13",
      "time_space",
      "main",
      "Bazı sayıları düşündüğümde onun zihinsel mekânını (yukarıda, solda, uzakta gibi) her zaman aynı hissederim.",
      "S14"
    ),
    Q(
      "S14",
      "time_space",
      "main",
      "Takvim kavramlarını (dün, bugün, yarın) renklerle veya mekânsal bir haritayla ilişkilendirdiğim olur.",
      "G_timespace_filter"
    ),
    G("G_timespace_filter", "time_space", "main", 6, "S15", "S18"),
    Q(
      "S15",
      "time_space",
      "filter",
      "Tarihleri ezberlemek benim için kolaydır.",
      "S16"
    ),
    Q(
      "S16",
      "time_space",
      "filter",
      "Tarihler veya çizelgeler daha önce kitapta vb. görmesem dahi aklımda soyut olarak belirli bir düzende canlanır.",
      "S17"
    ),
    Q(
      "S17",
      "time_space",
      "filter",
      "Günleri, ayları veya sayıları zihnimde bir düzene yerleştirmek için bilinçli bir çaba harcamam, bu düzen kendiliğinden oluşur.",
      "S18"
    ),

    // 4) Ses–Tat/Koku (S18–S20 main, S21–S22 filter)
    Q(
      "S18",
      "sound_taste_smell",
      "main",
      "Belirli sesler duyduğumda o ses bana belirli tatlar (örneğin ekşi, tatlı, acı) çağrıştırır.",
      "S19"
    ),
    Q(
      "S19",
      "sound_taste_smell",
      "main",
      "Bazı kelimeler veya isimler bende belirli yiyecek tatlarını anımsatır.",
      "S20"
    ),
    Q(
      "S20",
      "sound_taste_smell",
      "main",
      "Bir ses duyduğumda bununla ilişkilendirdiğim belirli kokular olabilir.",
      "G_soundtaste_filter"
    ),
    G("G_soundtaste_filter", "sound_taste_smell", "main", 6, "S21", "S23"),
    Q(
      "S21",
      "sound_taste_smell",
      "filter",
      "Bu çağrışımlar daha çok anılarıma dayalı olmaksızın kendiliğinden oluşur.",
      "S22"
    ),
    Q(
      "S22",
      "sound_taste_smell",
      "filter",
      "Aynı sesi her duyduğumda genellikle aynı tat veya koku hissi oluşur.",
      "S23"
    ),

    // 5) Ayna Dokunma (S23–S25 main, S26–S28 filter)
    Q(
      "S23",
      "mirror_touch",
      "main",
      "Karşımdaki insana fiziksel bir temas olduğunda (dokunma, vurma, çarpma) vücudumun aynı bölgesinde hafif bir his oluşur.",
      "S24"
    ),
    Q(
      "S24",
      "mirror_touch",
      "main",
      "Sosyal medyada yaralanma/sakatlanma içerikli videolara baktığımda kendi vücudumda da fiziksel bir tepki hissederim.",
      "S25"
    ),
    Q(
      "S25",
      "mirror_touch",
      "main",
      "Başka birinin fiziksel acı çektiğini gördüğümde aynı bölgede baskı, karıncalanma vb. hisler deneyimlerim.",
      "G_mirrortouch_filter"
    ),
    G("G_mirrortouch_filter", "mirror_touch", "main", 6, "S26", "S29"),
    Q(
      "S26",
      "mirror_touch",
      "filter",
      "Bu hisler üzüntü ve şefkat duygusundan öte bedenimdeki fiziksel bir deneyimdir.",
      "S27"
    ),
    Q(
      "S27",
      "mirror_touch",
      "filter",
      "Başkalarının deneyimlediği fiziksel etkileri gördüğümde oluşan bedensel hislerim istemsizdir, kontrol edemem.",
      "S28"
    ),
    Q(
      "S28",
      "mirror_touch",
      "filter",
      "Bu fiziksel tepkileri karşımdaki insanla aynı vücut bölgemde hissederim.",
      "S29"
    ),

    // 6) Kişi–Renk (S29–S31 main, S32–S33 filter)
    Q(
      "S29",
      "person_color",
      "main",
      "Tanıdığım kişilerin kişiliklerini veya seslerini belirli renklerle ilişkilendiririm.",
      "S30"
    ),
    Q(
      "S30",
      "person_color",
      "main",
      "Bir kişi hakkında düşündüğümde aklımda otomatik olarak bir şekil, desen veya yüzey dokusu canlanır.",
      "S31"
    ),
    Q(
      "S31",
      "person_color",
      "main",
      "İnsanları belirli geometrik şekillerle ya da ışık yoğunluklarıyla eşleştiririm.",
      "G_personcolor_filter"
    ),
    G("G_personcolor_filter", "person_color", "main", 6, "S32", "S34"),
    Q(
      "S32",
      "person_color",
      "filter",
      "Birisiyle ilişkilendirdiğim görsel, renk veya şekil genelde tutarlıdır. O insan bana hep aynı çağrışımı yapar.",
      "S33"
    ),
    Q(
      "S33",
      "person_color",
      "filter",
      "İnsanları renkler veya görsellerle eşleştirmem önceden öğrendiğim sosyal ilişkilerimden bağımsız, kendiliğinden oluşan bir algıdır.",
      "S34"
    ),

    // 7) Tat–Renk (S34–S36 main, S37–S38 filter)
    Q(
      "S34",
      "taste_color",
      "main",
      "Bir şey yediğimde, tadı zihnimde belirli bir rengin oluşmasına neden olabilir.",
      "S35"
    ),
    Q(
      "S35",
      "taste_color",
      "main",
      "Tatları zihnimde belirli şekiller (dikenli, yumuşak, yuvarlak vb.) olarak hissederim.",
      "S36"
    ),
    Q(
      "S36",
      "taste_color",
      "main",
      "Tanıdık tatların bende her zaman aynı görsel imgeyi oluşturduğunu fark ettiğim olur.",
      "G_tastecolor_filter"
    ),
    G("G_tastecolor_filter", "taste_color", "main", 6, "S37", "S39"),
    Q(
      "S37",
      "taste_color",
      "filter",
      "Yaşadığım görsel deneyimler her zaman aynı oluşur.",
      "S38"
    ),
    Q(
      "S38",
      "taste_color",
      "filter",
      "Bu deneyimlerim bende kendiliğinden, otomatik oluşur.",
      "S39"
    ),

    // 8) Koku–Renk (S39–S41 main, S42–S43 filter)
    Q(
      "S39",
      "smell_color",
      "main",
      "Bazı kokuları duyduğumda zihnimde otomatik bir renk belirir.",
      "S40"
    ),
    Q(
      "S40",
      "smell_color",
      "main",
      "Kokuların bende belirli şekiller veya dokular oluşturduğunu düşünürüm.",
      "S41"
    ),
    Q(
      "S41",
      "smell_color",
      "main",
      "Aynı kokuyu her zaman aynı renk veya biçimle ilişkilendiririm.",
      "G_smellcolor_filter"
    ),
    G("G_smellcolor_filter", "smell_color", "main", 6, "S42", "S44"),
    Q(
      "S42",
      "smell_color",
      "filter",
      "Bu deneyimler zihnimde kendiliğinden isteğim dışında meydana gelir.",
      "S43"
    ),
    Q(
      "S43",
      "smell_color",
      "filter",
      "Aynı kokuyu her aldığımda zihnimde aynı şekil, doku ya da renk oluşur.",
      "S44"
    ),

    // 9) Duygu–Renk (S44–S46 main, S47–S48 filter)
    Q(
      "S44",
      "emotion_color",
      "main",
      "Bazı duyguları yaşadığımda (heyecan, üzüntü, öfke), zihnimde belirli bir renk belirir.",
      "S45"
    ),
    Q(
      "S45",
      "emotion_color",
      "main",
      "Duygularımı belirli şekil veya dokularla tarif ettiğim olur.",
      "S46"
    ),
    Q(
      "S46",
      "emotion_color",
      "main",
      "Belirli bir kişiye karşı hissettiğim duygular bende otomatik görsel çağrışımlar oluşturur.",
      "G_emotion_filter"
    ),
    G("G_emotion_filter", "emotion_color", "main", 6, "S47", "S49"),
    Q(
      "S47",
      "emotion_color",
      "filter",
      "Bu çağrışımlar duygularımın türüne göre sabittir.",
      "S48"
    ),
    Q(
      "S48",
      "emotion_color",
      "filter",
      "Duygularımın bende oluşturduğu renk veya şekiller bilinçli betimleme değil, istemsiz bir zihinsel deneyimdir.",
      "S49"
    ),

    // 10) Mizofoni (S49–S50 main, S51–S52 filter)
    Q(
      "S49",
      "misophonia",
      "main",
      "Tiz sesler duyduğumda dişlerim kamaşır veya ağzımda ekşi tadı oluşur.",
      "S50"
    ),
    Q(
      "S50",
      "misophonia",
      "main",
      "Çiğneme, kalem tıklatma, hızlı nefes alıp verme gibi bazı günlük sesleri duyduğumda ani bir sinirlilik veya rahatsızlık hissederim.",
      "G_misophonia_filter"
    ),
    G("G_misophonia_filter", "misophonia", "main", 4, "S51", "END"),
    Q(
      "S51",
      "misophonia",
      "filter",
      "Bu tür seslere karşı hassasiyetim çocukluğumdan gelir.",
      "S52"
    ),
    Q(
      "S52",
      "misophonia",
      "filter",
      "Bu hislerimi kontrol etmem veya durdurmam benim için pek mümkün olmaz.",
      "END"
    ),

    { id: "END", type: "end" }
  ]
};

export default questionsTree;
