import React from "react";
import { NavLink } from "react-router-dom";

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
            <a className="menu__link" href="https://www.themoviedb.org/">
              API
            </a>
          </li>

          <li className="list-inline-item">
            <a
              className="menu__link"
              href="https://github.com/YsnElh/movies-app"
            >
              Repository
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
