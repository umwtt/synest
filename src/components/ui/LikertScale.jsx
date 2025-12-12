// src/components/ui/LikertScale.jsx
import React from "react";
import { LikertScale } from "../../logic/scales";

function LikertScaleComponent({ value, onChange }) {
  const { min, max, labels } = LikertScale;

  const points = [];
  for (let i = min; i <= max; i++) points.push(i);

  return (
    <div className="likert-scale centered">
      <span className="likert-label left">{labels.min}</span>

      <div className="likert-buttons">
        {points.map((v) => (
          <button
            key={v}
            type="button"
            className={`likert-dot size-${v} ${value === v ? "active" : ""}`}
            onClick={() => onChange(v)}
            aria-pressed={value === v}
          />
        ))}
      </div>

      <span className="likert-label right">{labels.max}</span>
    </div>
  );
}

export default LikertScaleComponent;
