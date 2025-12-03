export function createEmptyScores() {
  return {
    SENSORY_INTENSITY: 0,
    INTROVERSION: 0,
    COLOR_SOUND_LINK: 0,
    NEUTRALITY: 0
  };
}

export function accumulateScore(scores, questionNode, answerValue) {
  if (!questionNode.dimension || questionNode.type !== "question") return scores;
  const weight = questionNode.weight ?? 1;
  const dim = questionNode.dimension;
  return {
    ...scores,
    [dim]: (scores[dim] ?? 0) + answerValue * weight
  };
}

export function buildProfile(scores) {
  const entries = Object.entries(scores);
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);

  const dominant = sorted[0] ?? ["NEUTRALITY", 0];

  let headline = "";
  let summary = "";
  const tags = [];

  switch (dominant[0]) {
    case "COLOR_SOUND_LINK":
      headline = "Renk–Ses Dokumacısı";
      summary =
        "Sesleri yalnızca duymuyor, aynı zamanda görüyorsun. Dünyayı çok kanallı bir tuval gibi algılıyorsun.";
      tags.push("ses-renk eşleşmesi", "yoğun görsel düşünme");
      break;
    case "SENSORY_INTENSITY":
      headline = "Yüksek Duyusal Hassasiyet";
      summary =
        "Çevresel uyaranlar sana güçlü ve detaylı ulaşıyor. Bu hem yaratıcılık kaynağı hem de zaman zaman yorgunluk sebebi.";
      tags.push("yüksek hassasiyet", "derin işleme");
      break;
    case "INTROVERSION":
      headline = "İçsel Akış İzleyicisi";
      summary =
        "Dış gürültüden çok iç dünyana yaslanıyorsun. Sessiz alanlar, duyusal dokunuşların netleşmesine yardımcı oluyor.";
      tags.push("içe dönüklük", "odaklanmış algı");
      break;
    default:
      headline = "Dengeli Algı Profili";
      summary =
        "Duyusal uyaranlar seni ne boğuyor ne de aşırı tetikliyor. Algın, bağlama göre şekil değiştirebilen esnek bir yapıda.";
      tags.push("denge", "uyarlanabilirlik");
      break;
  }

  return {
    headline,
    summary,
    tags,
    rawScores: scores
  };
}
