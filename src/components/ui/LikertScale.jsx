import React from "react";
import { LikertScale as Likert } from "../../logic/behaviourTreeEngine";

const OPTIONS = [
  { label: "Asla", value: Likert.STRONGLY_DISAGREE },
  { label: "Hayır", value: Likert.DISAGREE },
  { label: "Nötr", value: Likert.NEUTRAL },
  { label: "Evet", value: Likert.AGREE },
  { label: "Kesinlikle", value: Likert.STRONGLY_AGREE }
];

function LikertScale({ value, onChange }) {
  return (
    <div className="likert-row">
      <span className="likert-label">Seviyeni işaretle</span>
      <div className="likert-buttons">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={
              "likert-btn" + (value === opt.value ? " active" : "")
            }
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LikertScale;
