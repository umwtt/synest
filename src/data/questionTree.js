// src/data/questionsTree.js
const questionsTree = {
  startNodeId: "q_intro_1",
  nodes: [
    {
      id: "q_intro_1",
      type: "question",
      dimension: "SENSORY_INTENSITY",
      weight: 1.0,
      mediaType: "text",
      text: "Kalabalık bir kafede olduğunda, sesleri ve renkleri ne kadar yoğun algılarsın?",
      next: [
        { range: [-2, -1], nextId: "q_visual_1" },
        { range: [0, 0], nextId: "q_neutral_1" },
        { range: [1, 2], nextId: "q_color_1" }
      ]
    },
    {
      id: "q_visual_1",
      type: "question",
      dimension: "INTROVERSION",
      weight: 1.2,
      mediaType: "image",
      mediaUrl: "/assets/images/blurred-crowd-1.jpg", // İstersen şimdilik null yap
      text: "Bu fotoğrafa baktığında sahnenin 'gürültülü' hissettirmesi seni ne kadar rahatsız ediyor?",
      next: [
        { range: [-2, 0], nextId: "q_end_branch_low" },
        { range: [1, 2], nextId: "q_color_2" }
      ]
    },
    {
      id: "q_color_1",
      type: "question",
      dimension: "COLOR_SOUND_LINK",
      weight: 1.4,
      mediaType: "text",
      text: "Belirli sesleri dinlediğinde, zihninde otomatik olarak renkler canlanır.",
      next: [
        { range: [-2, 0], nextId: "q_neutral_1" },
        { range: [1, 2], nextId: "q_color_2" }
      ]
    },
    {
      id: "q_color_2",
      type: "question",
      dimension: "COLOR_SOUND_LINK",
      weight: 1.6,
      mediaType: "image",
      mediaUrl: "/assets/images/color-bars-1.jpg",
      text: "Bu renk dizisini gördüğünde, kafanda ritim veya melodi oluşuyor gibi mi?",
      next: [{ range: [-2, 2], nextId: "q_end_main" }]
    },
    {
      id: "q_neutral_1",
      type: "question",
      dimension: "NEUTRALITY",
      weight: 0.8,
      mediaType: "text",
      text: "Genel olarak duyusal uyaranlar seni ne çok yoruyor ne de özellikle heyecanlandırıyor.",
      next: [{ range: [-2, 2], nextId: "q_end_main" }]
    },
    {
      id: "q_end_branch_low",
      type: "end",
      label: "LOW_INTENSITY_BRANCH"
    },
    {
      id: "q_end_main",
      type: "end",
      label: "MAIN_END"
    }
  ]
};

export default questionsTree;
