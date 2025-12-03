import React from "react";
import TopNav from "./TopNav";

function Shell({ children, navItems, activePath, onNavClick }) {
  return (
    <div className="glass-shell">
      <div className="glass-shell-inner">
        <TopNav
          navItems={navItems}
          activePath={activePath}
          onNavClick={onNavClick}
        />
        <main key={activePath} className="main-content route-fade">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Shell;
