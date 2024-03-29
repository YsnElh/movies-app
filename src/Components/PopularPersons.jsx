import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersons } from "../features/persons/personsSlice";
import { fetchSearchedPersons } from "../features/persons/personSearchSlice";
import { LoadingOverlay } from "./LoadingOverlay";
import { NavLink } from "react-router-dom";

const imgSrcTMDB = "https://image.tmdb.org/t/p/original";

export const PopularPersons = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [genreFetchSelect, setGenreFetchSelect] = useState("");
  const { persons, loading, error } = useSelector((state) => state.persons);
  const { searched_persons, loadingSP, errorSP } = useSelector(
    (state) => state.personsSearch
  );

  useEffect(() => {
    const storedSearchValue = sessionStorage.getItem("searchvaluepersons");
    const storedFetchSel = sessionStorage.getItem("fetchsel");

    if (storedSearchValue) setSearchValue(storedSearchValue);
    if (storedFetchSel) setGenreFetchSelect(storedFetchSel);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("searchvaluepersons", searchValue);
    sessionStorage.setItem("fetchsel", genreFetchSelect);
  }, [searchValue, genreFetchSelect]);

  useEffect(() => {
    if (searchValue.length > 0) dispatch(fetchSearchedPersons({ searchValue }));
    else dispatch(fetchPersons({ type: genreFetchSelect }));
  }, [dispatch, searchValue, genreFetchSelect]);

  const displayPersons = searchValue.length > 0 ? searched_persons : persons;

  return (
    <>
      {(loading || loadingSP) && <LoadingOverlay />}
      <div className="form__group field">
        <input
          type="search"
          className="form__field"
          placeholder="Title"
          id="movie-title-search"
          title="search movie by title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="movie-title-search" className="form__label">
          Title
        </label>
        <div className="d-flex flex-column">
          <select
            className="filter-select"
            name="selectfilter"
            id="selectfilter"
            title="Serie Genres"
            onChange={(e) => setGenreFetchSelect(e.target.value)}
            value={genreFetchSelect}
          >
            <option value="popular">Popular</option>
            <option value="day">Trending</option>
          </select>
        </div>
      </div>
      {displayPersons && (
        <div className="row row-cols-md-5 g-4 p-3 persons-cards-container">
          {displayPersons.map((person) => (
            <div key={person.id} className="col person-card">
              <div className="card">
                <img
                  src={
                    person.profile_path
                      ? imgSrcTMDB + person.profile_path
                      : "/movies-app/cast-img-not-found.jpg"
                  }
                  className="card-img-top"
                  alt={person.name + " photo"}
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <p className="card-text">
                    {person.known_for_department} Department
                  </p>
                  <NavLink
                    to={"/movies-app/person/" + person.id}
                    className="fs-5 link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  >
                    <i className="fas fa-eye"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {searched_persons.length === 0 &&
        searchValue.length > 0 &&
        !errorSP &&
        !loading && (
          <div className="display-4 text-light" style={{ textAlign: "center" }}>
            There is no persons based on this search: {searchValue}!
          </div>
        )}
      {(error || errorSP) && (
        <div className="display-4 text-light" style={{ textAlign: "center" }}>
          {error || errorSP}
        </div>
      )}
    </>
  );
};
