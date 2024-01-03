import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../features/favourites/darkModeSlice";

import "../style/navToDark.css";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [isNightMode, setNightMode] = useState(true);
  const dispatch = useDispatch();
  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);

  const handleNightModeToggle = () => {
    dispatch(setDarkMode(!isNightMode));
    setNightMode(!isNightMode);
  };

  useEffect(() => {
    // Update body and footer styles when darkModeStatu changes
    if (!darkModeStatu) {
      document.body.classList.add("night-mode-body");
      document.getElementById("footer").classList.add("night-mode-footer");
      document.getElementById("up-m").classList.add("night-mode-navbar");
      document
        .getElementById("ul-nav-mobile")
        .classList.add("night-mode-navbar-ul");
    } else {
      document.body.classList.remove("night-mode-body");
      document.getElementById("footer").classList.remove("night-mode-footer");
      document.getElementById("up-m").classList.remove("night-mode-navbar");
      document
        .getElementById("ul-nav-mobile")
        .classList.remove("night-mode-navbar-ul");
    }
  }, [darkModeStatu]);

  function handleClick() {
    if (clicked === false) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }

  const favouritesShows = useSelector(
    (state) => state.favouritesShow.favouritesShow
  );

  // ----------------
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!navbarRef.current.contains(event.target)) {
        //alert("User clicked outside of navbar");
        setClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ---------

  return (
    <header id="up-m">
      <nav ref={navbarRef}>
        <NavLink
          to="/movies-app/"
          style={{ color: "#fff", textDecoration: "none", fontSize: "1.3rem" }}
        >
          <img src="logo.png" style={{ width: "30px" }} alt="Movies App Logo" />
          MOVIES APP
        </NavLink>
        <div>
          <ul
            className={clicked ? "navbar-links activeNav" : "navbar-links"}
            id="ul-nav-mobile"
          >
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink
                activeclassname="active"
                style={{ fontSize: "1.3rem" }}
                to="movies-app/movies"
              >
                Popular movies
              </NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink
                activeclassname="active"
                style={{ fontSize: "1.3rem" }}
                to="movies-app/action-movies"
              >
                Action movies
              </NavLink>
            </li>

            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink
                activeclassname="active"
                style={{ fontSize: "1.3rem" }}
                to="movies-app/comedy-movies"
              >
                Comedy movies
              </NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink
                activeclassname="active"
                style={{ fontSize: "1.3rem" }}
                to="movies-app/series"
              >
                Series
              </NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink
                activeclassname="active"
                style={{ fontSize: "1.3rem" }}
                to="movies-app/favourite-shows"
              >
                Favourites Shows{" "}
                {favouritesShows.length > 0 ? (
                  <span className="badgeME">{favouritesShows.length}</span>
                ) : null}
              </NavLink>
            </li>
            <label className="theme">
              <input
                type="checkbox"
                className="input"
                onChange={handleNightModeToggle}
                checked={!darkModeStatu}
              />
              <svg
                className="icon icon-sun"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" x2="12" y1="1" y2="3"></line>
                <line x1="12" x2="12" y1="21" y2="23"></line>
                <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
                <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
                <line x1="1" x2="3" y1="12" y2="12"></line>
                <line x1="21" x2="23" y1="12" y2="12"></line>
                <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
                <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
              </svg>
              <svg className="icon icon-moon" viewBox="0 0 24 24">
                <path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8zm2.8 12.5c.5 0 1 0 1.4-.1-1.2 1.1-2.8 1.7-4.5 1.7-3.9 0-7-3.1-7-7 0-2.5 1.4-4.8 3.5-6-.7 1.1-1 2.4-1 3.8-.1 4.2 3.4 7.6 7.6 7.6z"></path>
              </svg>
            </label>
          </ul>
        </div>
        <div
          id="mobile"
          onClick={() => {
            handleClick();
          }}
        >
          <i
            id="bar"
            className={clicked ? "fa-solid fa-xmark" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
