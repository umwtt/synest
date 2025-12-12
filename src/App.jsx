import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Shell from "./components/layout/Shell";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import FAQPage from "./pages/FAQPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import PrivacyPage from "./pages/PrivacyPage";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/intro", label: "Tanıtım" },
  { path: "/faq", label: "SSS" },
  { path: "/test", label: "Test" },
  { path: "/privacy", label: "KVKK" }
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-root">
      {/* GLOBAL WALLPAPER */}
      <div className="sini-bg" />

      <Shell
        navItems={NAV_ITEMS}
        activePath={location.pathname}
        onNavClick={navigate}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Shell>
    </div>
  );
}


export default App;
