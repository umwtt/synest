import React from "react";

function TopNav({ navItems, activePath, onNavClick }) {
  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <button className="icon-button" aria-label="Menu">
          +
        </button>
      </div>
      <nav className="nav-menu" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={
              "nav-pill" + (activePath === item.path ? " active" : "")
            }
            onClick={() => onNavClick(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="top-nav-right">
        <button className="icon-button" aria-label="Contact">
          ☎
        </button>
      </div>
    </header>
  );
}

export default TopNav;
