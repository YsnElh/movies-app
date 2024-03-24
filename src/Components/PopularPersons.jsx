import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersons } from "../features/persons/personsSlice";

export const PopularPersons = () => {
  const dispatch = useDispatch();
  const { persons, loading, error } = useSelector((state) => state.persons);
  const imgSrcTMDB = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch]);

  console.log(persons);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching data</div>}
      {persons && (
        <div className="row row-cols-md-5 g-4 p-3 persons-cards-container">
          {persons.map((person) => (
            <div key={person.id} className="col person-card">
              <div class="card">
                <img
                  src={imgSrcTMDB + person.profile_path}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{person.name}</h5>
                  <p class="card-text">
                    {person.known_for_department} Department
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
