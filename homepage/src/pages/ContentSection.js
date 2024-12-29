import React from "react";
import "./css/ContentSection.css"; // CSS 파일을 임포트

const ContentSection = ({ id, title }) => {
  return (
    <section id={id}>
      <h1>{title}</h1>
    </section>
  );
};

export default ContentSection;