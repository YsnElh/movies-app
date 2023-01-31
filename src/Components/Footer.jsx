import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="mailto:Elhainouniyassine21@gmail.com">
            <i class="fa-solid fa-envelope"></i>
          </a>

          <a href="https://github.com/YsnElh">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <NavLink to="/">Home</NavLink>
          </li>

          <li className="list-inline-item">
            <a href="https://www.themoviedb.org/">API Source</a>
          </li>

          <li className="list-inline-item">
            <a href="https://github.com/YsnElh/movies-app">Source code</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
