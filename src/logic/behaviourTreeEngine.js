import treeJson from "../data/questionTree.js";

export const LikertScale = {
  STRONGLY_DISAGREE: -2,
  DISAGREE: -1,
  NEUTRAL: 0,
  AGREE: 1,
  STRONGLY_AGREE: 2
};

export function loadTree() {
  const { startNodeId, nodes } = treeJson;
  const map = new Map(nodes.map((n) => [n.id, n]));
  return { startNodeId, nodesMap: map };
}

function computeModuleCoreAvg(module, answers, nodesMap) {
  let sum = 0;
  let n = 0;
  for (const [id, v] of Object.entries(answers)) {
    const node = nodesMap.get(id);
    if (!node || node.type !== "question") continue;
    if (node.module !== module) continue;
    if (node.role !== "core") continue;
    if (v == null) continue;
    sum += v;
    n += 1;
  }
  return n === 0 ? null : sum / n;
}

// node.type === "question" için normal next; node.type === "gate" için branch
export function resolveNextId(node, answerValue, ctx) {
  const { answers, nodesMap } = ctx;

  if (!node) return null;

  if (node.type === "question") {
    const next = node.next ?? [];
    const match = next.find(
      (rule) => answerValue >= rule.range[0] && answerValue <= rule.range[1]
    );
    return match ? match.nextId : null;
  }

  if (node.type === "gate") {
    const avg = computeModuleCoreAvg(node.module, answers, nodesMap);
    // hiç cevap yoksa güvenli tarafta: fail
    if (avg == null) return node.nextIfFail;
    return avg >= node.threshold ? node.nextIfPass : node.nextIfFail;
  }

  return null;
}

