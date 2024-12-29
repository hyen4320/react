import React from "react";
import TopMenu from "./pages/TopMenu";
import ContentSection from "./pages/ContentSection";
import WeatherNow from "./pages/Weather";
import "./App.css"; // CSS 파일을 임포트
import {BrowserRouter,Route, Routes, Link } from "react-router-dom"

const App = () => {
  const sections = [
    { id: "home", title: "Home Section" },
    { id: "about", title: "About Section" },
    { id: "services", title: "Services Section" },
    { id: "contact", title: "Contact Section" },
  ];

  return (
    <div>
      
      <TopMenu />
      <div className="content">
        {sections.map((section) => (
          <ContentSection key={section.id} id={section.id} title={section.title} />
        ))}
        <WeatherNow />
      </div>
    </div>
  );
};

export default App;
