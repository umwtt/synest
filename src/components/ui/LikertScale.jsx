import React from "react";
import { LikertScale as Likert } from "../../logic/behaviourTreeEngine";

const VALUES = [
  Likert.STRONGLY_DISAGREE,
  Likert.DISAGREE,
  Likert.NEUTRAL,
  Likert.AGREE,
  Likert.STRONGLY_AGREE
];

function LikertScale({ value, onChange }) {
  return (
    <div className="likert-strip">
      <div className="likert-end">Asla</div>

      <div className="likert-dots" role="radiogroup" aria-label="Likert scale">
        {VALUES.map((v, idx) => (
          <button
            key={v}
            type="button"
            className={"likert-dot" + (value === v ? " active" : "") + ` s${idx + 1}`}
            aria-checked={value === v}
            role="radio"
            onClick={() => onChange(v)}
          />
        ))}
      </div>

      <div className="likert-end">Kesinlikle</div>
    </div>
  );
}

export default LikertScale;
