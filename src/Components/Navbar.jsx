import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "../style/navToDark.css";

function Navbar() {
  const [clicked, setClicked] = useState(false);

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
          <img
            src="/movies-app/logo.png"
            style={{ width: "30px" }}
            alt="movies app logo"
          />
          <strong>MOVIES APP</strong>
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
              </NavLink>
              {favouritesShows.length > 0 ? (
                <span className="badgeME">{favouritesShows.length}</span>
              ) : null}
            </li>
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
