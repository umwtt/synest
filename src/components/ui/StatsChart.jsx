import React from "react";

function StatsChart({ scores }) {
  const entries = Object.entries(scores);
  const maxAbs =
    Math.max(...entries.map(([, v]) => Math.abs(v)), 1);

  return (
    <div style={{ marginTop: 24 }}>
      {entries.map(([dim, value]) => {
        const width = (Math.abs(value) / maxAbs) * 100;
        return (
          <div key={dim} style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.75)",
                marginBottom: 4
              }}
            >
              {dim}
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${width}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, rgba(79,156,255,0.1), #4f9cff)"
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsChart;
