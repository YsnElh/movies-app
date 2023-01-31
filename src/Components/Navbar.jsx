import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

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
          to="/"
          style={{ color: "#fff", textDecoration: "none", fontSize: "1.3rem" }}
        >
          Movie APP
        </NavLink>
        <div>
          <ul className={clicked ? "navbar-links activeNav" : "navbar-links"}>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="/movies">Popular movies</NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="/action-movies">Action movies</NavLink>
            </li>

            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="/comedy-movies">Comedy movies</NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="series">series</NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="favourite-shows">
                Favourites Shows{" "}
                <span className="badgeME">{favouritesShows.length}</span>
              </NavLink>
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
