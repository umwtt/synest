import React from "react";
import LikertScale from "./LikertScale";

function QuestionCard({ node, value, onChange, index }) {
  if (!node) return null;

  const hasImage = node.mediaType === "image" && node.mediaUrl;

  return (
    <article className="question-card">
      <div className="question-meta">
        Soru {index + 1} · {node.dimension}
      </div>
      <div className="question-text">{node.text}</div>
      {hasImage && (
        <div style={{ marginBottom: 12 }}>
          <img
            src={node.mediaUrl}
            alt=""
            style={{
              width: "100%",
              borderRadius: 16,
              display: "block",
              maxHeight: 220,
              objectFit: "cover"
            }}
          />
        </div>
      )}
      <LikertScale value={value} onChange={onChange} />
    </article>
  );
}

export default QuestionCard;
