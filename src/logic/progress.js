// Ortalama modül uzunlukları (core + filter ortalaması)
// Gate'li yapıya göre yaklaşık değerler
const MODULE_AVG_LENGTH = {
  grapheme_color: 5,
  sound_color: 4,
  time_space: 5,
  sound_taste_smell: 4,
  mirror_touch: 4,
  person_color_shape: 4,
  taste_color_shape: 5,
  smell_color_shape: 4,
  emotion_color_shape: 4,
  misophonia: 3
};

export function estimateRemainingQuestions(history, nodesMap) {
  const answeredModules = new Set();

  history.forEach((id) => {
    const node = nodesMap.get(id);
    if (node?.type === "question") {
      answeredModules.add(node.module);
    }
  });

  let estimate = 0;

  for (const [mod, avg] of Object.entries(MODULE_AVG_LENGTH)) {
    if (!answeredModules.has(mod)) {
      estimate += avg;
    }
  }

  return Math.max(estimate, 0);
}
