// src/data/questionsTree.js
const T = (id, prompt, module, role, nextId) => ({
  id,
  type: "question",

  // UI bileşenleri hangisini bekliyorsa çalışsın diye alias'lar:
  prompt,
  text: prompt,
  question: prompt,

  module,
  role, // "core" | "filter"
  next: [{ range: [-2, 2], nextId }]
});

const G = (id, module, threshold, nextIfPass, nextIfFail) => ({
  id,
  type: "gate",
  module,
  threshold,      // core avg >= threshold => pass
  nextIfPass,
  nextIfFail
});

const E = (id, label) => ({ id, type: "end", label });

const questionsTree = {
  startNodeId: "S1",
  nodes: [
    // 1) Grapheme-Color (core)
    T("S1", "Belirli harfleri gördüğümde aklımda otomatik olarak belirli renkler canlanır.", "grapheme_color", "core", "S2"),
    T("S2", "Belirli rakamları her zaman aynı renklerle ilişkilendiririm.", "grapheme_color", "core", "S3"),
    T("S3", "Yazılı bir metne baktığımda bazı kelimeler ya da harfler gözüme “renkli gibi” gelir.", "grapheme_color", "core", "S4"),
    T("S4", "Rakamları veya harfleri farklı netlik, parlaklık veya belirginlik derecelerinde görürüm.", "grapheme_color", "core", "gate_grapheme_color"),

    G("gate_grapheme_color", "grapheme_color", 1, "S5", "S7"),
    // filters
    T("S5", "Bu renk algısını tekrarlı ve tutarlı bir biçimde yaşarım.", "grapheme_color", "filter", "S6"),
    T("S6", "Renk deneyimim bilincimden bağımsız, kendiliğinden oluşur.", "grapheme_color", "filter", "S7"),

    // 2) Sound-Color (core)
    T("S7", "Duyduğum bazı sesler (kapı sesi, motor sesi, zil sesi vb.) zihnimle belirli renklerle eşleşir.", "sound_color", "core", "S8"),
    T("S8", "Müzik dinlerken belirli renk geçişleri veya ışık dalgaları gibi görsel hisler yaşarım.", "sound_color", "core", "S9"),
    T("S9", "Biri konuştuğunda, sesinin tonuna bağlı olarak zihninizde renk veya parlaklık değişimleri olur.", "sound_color", "core", "gate_sound_color"),
    G("gate_sound_color", "sound_color", 1, "S10", "S11"),
    T("S10", "Bu deneyimi zaman içerisinde tekrar tekrar yaşarım.", "sound_color", "filter", "S11"),

    // 3) Time-Space (core)
    T("S11", "Haftanın günlerini düşündüğümde onları zihnimde belirli bir düzende (çember, çizgi vb.) yerleştirilmiş olarak görürüm.", "time_space", "core", "S12"),
    T("S12", "Bazı sayıları düşündüğümde onun zihinsel mekânını (yukarıda, solda, uzakta gibi) her zaman aynı hissederim.", "time_space", "core", "S13"),
    T("S13", "Takvim kavramlarını (dün, bugün, yarın) renklerle veya mekânsal bir haritayla ilişkilendirdiğim olur.", "time_space", "core", "gate_time_space"),
    G("gate_time_space", "time_space", 1, "S14", "S16"),
    T("S14", "Tarihleri ezberlemek benim için kolaydır.", "time_space", "filter", "S15"),
    T("S15", "Tarihler veya çizelgeler daha önce kitapta vb. görmesem dahi aklımda soyut olarak belirli bir düzende canlanır.", "time_space", "filter", "S16"),

    // 4) Sound→Taste/Smell (core)
    T("S16", "Belirli sesler duyduğumda o ses bana belirli tatlar (örneğin ekşi, tatlı, acı) çağrıştırır.", "sound_taste_smell", "core", "S17"),
    T("S17", "Bazı kelimeler veya isimler bende belirli yiyecek tatlarını anımsatır.", "sound_taste_smell", "core", "S18"),
    T("S18", "Bir ses duyduğumda bununla ilişkilendirdiğim belirli kokular olabilir.", "sound_taste_smell", "core", "gate_sound_taste_smell"),
    G("gate_sound_taste_smell", "sound_taste_smell", 1, "S19", "S20"),
    T("S19", "Bu çağrışımlar daha çok anılarıma dayalı olmaksızın kendiliğinden oluşur.", "sound_taste_smell", "filter", "S20"),

    // 5) Mirror Touch (core)
    T("S20", "Karşımdaki insana fiziksel bir temas olduğunda vücudumun aynı bölgesinde hafif bir his oluşur.", "mirror_touch", "core", "S21"),
    T("S21", "Sosyal medyada yaralanma/sakatlanma içerikli videolara baktığımda kendi vücudumda da fiziksel bir tepki hissederim.", "mirror_touch", "core", "S22"),
    T("S22", "Başka birinin fiziksel acı çektiğini gördüğümde aynı bölgede baskı, karıncalanma vb. hisler deneyimlerim.", "mirror_touch", "core", "gate_mirror_touch"),
    G("gate_mirror_touch", "mirror_touch", 1, "S23", "S24"),
    T("S23", "Bu hisler üzüntü ve şefkat duygusundan öte bedenimdeki fiziksel bir deneyimdir.", "mirror_touch", "filter", "S24"),

    // 6) Person→Color/Shape (core)
    T("S24", "Tanıdığım kişilerin kişiliklerini veya seslerini belirli renklerle ilişkilendiririm.", "person_color_shape", "core", "S25"),
    T("S25", "Bir kişi hakkında düşündüğümde aklımda otomatik olarak bir şekil, desen veya yüzey dokusu canlanır.", "person_color_shape", "core", "S26"),
    T("S26", "İnsanları belirli geometrik şekillerle ya da ışık yoğunluklarıyla eşleştiririm.", "person_color_shape", "core", "gate_person_color_shape"),
    G("gate_person_color_shape", "person_color_shape", 1, "S27", "S28"),
    T("S27", "Birisiyle ilişkilendirdiğim görsel, renk veya şekil genelde tutarlıdır.", "person_color_shape", "filter", "S28"),

    // 7) Taste→Color/Shape (core)
    T("S28", "Bir şey yediğimde, tadı zihnimde belirli bir rengin oluşmasına neden olabilir.", "taste_color_shape", "core", "S29"),
    T("S29", "Tatları zihnimde belirli şekiller (dikenli, yumuşak, yuvarlak vb.) olarak hissederim.", "taste_color_shape", "core", "S30"),
    T("S30", "Tanıdık tatların bende her zaman aynı görsel imgeyi oluşturduğunu fark ettiğim olur.", "taste_color_shape", "core", "gate_taste_color_shape"),
    G("gate_taste_color_shape", "taste_color_shape", 1, "S31", "S33"),
    T("S31", "Yaşadığım görsel deneyimler her zaman aynı oluşur.", "taste_color_shape", "filter", "S32"),
    T("S32", "Bu deneyimlerim bende kendiliğinden, otomatik oluşur.", "taste_color_shape", "filter", "S33"),

    // 8) Smell→Color/Shape (core)
    T("S33", "Bazı kokuları duyduğumda zihnimde otomatik bir renk belirir.", "smell_color_shape", "core", "S34"),
    T("S34", "Kokuların bende belirli şekiller veya dokular oluşturduğunu düşünürüm.", "smell_color_shape", "core", "S35"),
    T("S35", "Aynı kokuyu her zaman aynı renk veya biçimle ilişkilendiririm.", "smell_color_shape", "core", "gate_smell_color_shape"),
    G("gate_smell_color_shape", "smell_color_shape", 1, "S36", "S37"),
    T("S36", "Bu deneyimler zihnimde kendiliğinden isteğim dışında meydana gelir.", "smell_color_shape", "filter", "S37"),

    // 9) Emotion→Color/Shape (core)
    T("S37", "Bazı duyguları yaşadığımda zihnimde belirli bir renk belirir.", "emotion_color_shape", "core", "S38"),
    T("S38", "Duygularımı belirli şekil veya dokularla tarif ettiğim olur.", "emotion_color_shape", "core", "S39"),
    T("S39", "Belirli bir kişiye karşı hissettiğim duygular bende otomatik görsel çağrışımlar oluşturur.", "emotion_color_shape", "core", "gate_emotion_color_shape"),
    G("gate_emotion_color_shape", "emotion_color_shape", 1, "S40", "S41"),
    T("S40", "Bu çağrışımlar duygularımın türüne göre sabittir.", "emotion_color_shape", "filter", "S41"),

    // 10) Misophonia (core)
    T("S41", "Tiz sesler duyduğumda dişlerim kamaşır veya ağzımda ekşi tadı oluşur.", "misophonia", "core", "S42"),
    T("S42", "Çiğneme, kalem tıklatma, hızlı nefes alma gibi sesler duyduğumda ani bir sinirlilik veya rahatsızlık hissederim.", "misophonia", "core", "gate_misophonia"),
    G("gate_misophonia", "misophonia", 1, "S43", "end_main"),
    T("S43", "Bu tür seslere karşı hassasiyetim çocukluğumdan gelir.", "misophonia", "filter", "end_main"),

    E("end_main", "MAIN_END")
  ]
};

export default questionsTree;