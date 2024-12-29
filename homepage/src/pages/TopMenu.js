import React from "react";
import "./css/TopMenu.css"; // CSS 파일을 임포트

const TopMenu = () => {
  return (
    <nav className="top-menu">
      <div className="logo">MyLogo</div>
      <ul className="menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default TopMenu;
