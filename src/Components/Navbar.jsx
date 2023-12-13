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
          to="/movies-app"
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
              <NavLink to="movies-app/movies">Popular movies</NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="movies-app/action-movies">Action movies</NavLink>
            </li>

            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="movies-app/comedy-movies">Comedy movies</NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="movies-app/series">Series</NavLink>
            </li>
            <li
              onClick={() => {
                handleClick();
              }}
            >
              <NavLink to="movies-app/favourite-shows">
                Favourites Shows{" "}
                {favouritesShows.length > 0 ? (
                  <span className="badgeME">{favouritesShows.length}</span>
                ) : null}
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
