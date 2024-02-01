import React from "react";

export const Footer = () => {
  return (
    <footer className="footer-basic" id="footer">
      <div>
        <div className="social">
          <a href="mailto:Elhainouniyassine21@gmail.com">
            <i className="fa-solid fa-envelope"></i>
          </a>

          <a href="https://github.com/YsnElh">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/yassine-elhainouni/">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a
              className="menu__link"
              href="https://github.com/YsnElh/movies-app"
            >
              repository
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
