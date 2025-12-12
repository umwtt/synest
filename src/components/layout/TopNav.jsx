import React, { useEffect, useMemo, useState } from "react";

function TopNav({ navItems, activePath, onNavClick }) {
  const [open, setOpen] = useState(false);

  const activeLabel = useMemo(() => {
    const found = navItems.find((n) => n.path === activePath);
    return found?.label ?? "Menu";
  }, [navItems, activePath]);

  useEffect(() => {
    // route değişince sheet kapansın
    setOpen(false);
  }, [activePath]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header className="top-nav">
        <div className="top-nav-left">
          <button className="icon-button" aria-label="Menu">
            +
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="nav-menu nav-desktop" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={"nav-pill" + (activePath === item.path ? " active" : "")}
              onClick={() => onNavClick(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile: current page + hamburger */}
        <div className="nav-mobile">
          <button
            className="nav-pill"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            {activeLabel}
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>

        <div className="top-nav-right">
          <button className="icon-button" aria-label="Contact">
            ☎
          </button>
        </div>
      </header>

      {/* Bottom sheet */}
      {open && (
        <div className="sheet-backdrop" onMouseDown={() => setOpen(false)}>
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="sheet-header">
              <div className="sheet-title">Sinipalet</div>
              <button
                type="button"
                className="icon-button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="sheet-list">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className={
                    "sheet-item" + (activePath === item.path ? " active" : "")
                  }
                  onClick={() => onNavClick(item.path)}
                >
                  <span>{item.label}</span>
                  <span className="sheet-arrow">→</span>
                </button>
              ))}
            </div>

            <div className="sheet-foot">
              <div className="sheet-footnote">
                Bu menü mobil için optimize edilmiştir.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopNav;
