import React from "react";
import github from "../assets/github-mark.png";
import linkedln from "../assets/linkedln.png";
import mail_logo from "../assets/mail_logo.png";

export default function Header() {
  return (
    <div className="header-banner">
      <div className="header-title">
        <h1> e-Kolay Eczane </h1>
      </div>
      <div className="links">
        <div className="icon">
          <a target="_blank" href="https://github.com/emreunsal1">
            <img src={github}></img>
          </a>
        </div>
        <div className="icon">
          <a target="_blank" href="https://www.linkedin.com/in/emreunsal111/">
            <img src={linkedln}></img>
          </a>
        </div>
        <div className="icon">
          <a target="_blank" href="mailto:unsalemre111@gmail.com">
            <img src={mail_logo}></img>
          </a>
        </div>
      </div>
    </div>
  );
}
