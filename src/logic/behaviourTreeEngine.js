// src/logic/behaviourTreeEngine.js
import questionsTree from "../data/questionsTree";

// Tree yükleyici
export function loadTree() {
  const nodesMap = new Map();
  questionsTree.nodes.forEach((n) => nodesMap.set(n.id, n));

  return {
    startNodeId: questionsTree.startNodeId,
    nodesMap,
    modules: questionsTree.modules
  };
}

// Next resolver
export function resolveNextId(node, value, ctx) {
  if (!node) return null;

  // 1️⃣ Question node: direct next
  if (node.type === "question") {
    if (!node.next || node.next.length === 0) return null;
    return node.next[0].nextId ?? null;
  }

  // 2️⃣ Gate node
  if (node.type === "gate") {
    const { condition } = node;

    if (condition.type === "moduleScoreGte") {
      const { module, phase, min } = condition;
      const score = getModuleScore(ctx.answers, ctx.nodesMap, module, phase);
      return score >= min ? node.then : node.else;
    }

    console.warn("Unknown gate condition:", condition);
    return null;
  }

  return null;
}

// Modül skorunu answers üzerinden hesapla
function getModuleScore(answers, nodesMap, module, phase) {
  let sum = 0;

  for (const [qid, value] of Object.entries(answers)) {
    const node = nodesMap.get(qid);
    if (
      node &&
      node.type === "question" &&
      node.module === module &&
      node.phase === phase &&
      value != null
    ) {
      sum += value;
    }
  }

  return sum;
}
