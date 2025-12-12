export function estimateProgress(tree, answers) {
  const { nodesMap } = tree;

  let answered = Object.keys(answers).length;
  let reachable = 0;

  for (const node of nodesMap.values()) {
    if (node.type !== "question") continue;

    // Ana sorular her zaman sayılır
    if (node.phase === "main") {
      reachable += 1;
      continue;
    }

    // Filtre soruları: gate açıldıysa say
    if (node.phase === "filter") {
      const gateModule = node.module;
      const moduleAnswers = Object.entries(answers)
        .filter(([qid]) => {
          const q = nodesMap.get(qid);
          return q && q.module === gateModule && q.phase === "main";
        })
        .map(([, v]) => v);

      const avg =
        moduleAnswers.length > 0
          ? moduleAnswers.reduce((a, b) => a + b, 0) /
            (moduleAnswers.length * 4)
          : 0;

      if (avg >= 0.65) reachable += 1;
    }
  }

  return {
    answered,
    reachable,
    progress: reachable > 0 ? answered / reachable : 0
  };
}
