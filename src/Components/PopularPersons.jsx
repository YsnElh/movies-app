import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersons } from "../features/persons/personsSlice";
import { NavLink } from "react-router-dom";

export const PopularPersons = () => {
  const dispatch = useDispatch();
  const { persons, loading, error } = useSelector((state) => state.persons);
  const imgSrcTMDB = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching data</div>}
      {persons && (
        <div className="row row-cols-md-5 g-4 p-3 persons-cards-container">
          {persons.map((person) => (
            <div key={person.id} className="col person-card">
              <div className="card">
                <img
                  src={imgSrcTMDB + person.profile_path}
                  className="card-img-top"
                  alt="..."
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
    </>
  );
};
