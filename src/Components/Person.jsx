import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  fetchPerson,
  fetchPersonCombinedCredits,
} from "../features/persons/singlePersonSlice";
import { LoadingOverlay } from "./LoadingOverlay";

const imgSrcTMDB = "https://image.tmdb.org/t/p/original";

export const Person = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { person, combinedCredits, loading, error } = useSelector(
    (state) => state.person
  );

  useEffect(() => {
    dispatch(fetchPerson({ id }));
    dispatch(fetchPersonCombinedCredits({ id }));
  }, [dispatch, id]);

  const top10Credits = combinedCredits.cast
    ? combinedCredits.cast
        .filter((cast) => cast.vote_count > 200)
        .sort((a, b) => {
          if (a.vote_average !== b.vote_average) {
            return b.vote_average - a.vote_average;
          } else {
            return b.vote_count - a.vote_count;
          }
        })
        .reduce(
          (acc, cast) => {
            if (!acc.ids.includes(cast.id)) {
              acc.ids.push(cast.id);
              acc.result.push(cast);
            }
            return acc;
          },
          { ids: [], result: [] }
        )
        .result.slice(0, 10)
    : [];
  function formatDate(inputDate) {
    if (inputDate) {
      const dateParts = inputDate.split("-");
      const year = dateParts[0];
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedDate = `${day} ${monthNames[month - 1]} ${year}`;

      return formattedDate;
    }
    return inputDate;
  }
  return (
    <>
      {loading && <LoadingOverlay />}
      {!loading && !error && person ? (
        <div className="text-white p-3 d-flex flex-row justify-content-around align-items-start flex-wrap">
          <div style={{ width: "20%" }}>
            <img
              src={
                person.profile_path
                  ? imgSrcTMDB + person.profile_path
                  : "/movies-app/cast-img-not-found.jpg"
              }
              className="img-fluid rounded"
              width={"100%"}
              alt={person.name + " photo"}
            />
            <h3 className="display-6">Personal Info</h3>
            <h5>
              <b>Known for:</b> <br /> {person.known_for_department}
            </h5>
            {person.gender === 1 || person.gender === 2 ? (
              <h5>
                <b>Gender:</b> <br /> {person.gender === 1 ? "Female" : "Male"}
              </h5>
            ) : null}

            <h5>
              <b>Birthday:</b> <br /> {formatDate(person.birthday)}
            </h5>
            <h5>
              <b>Place of Birth:</b> <br /> {person.place_of_birth}
            </h5>
            <h5>
              <b>Also Known As:</b>
              {person.also_known_as?.map((n, i) => (
                <div key={i}>{n}</div>
              ))}
            </h5>
          </div>
          <div style={{ width: "75%" }}>
            <h1 className="display-1">{person.name}</h1>
            <h3 className="display-6">Biography</h3>
            <div className="fs-4">{person.biography}</div>
            <div className="d-flex flex-row align-items-start overflow-auto mt-3">
              {top10Credits.map((show) => (
                <div key={show.id} style={{ marginRight: "15px" }}>
                  <img
                    src={
                      show.poster_path
                        ? `https://image.tmdb.org/t/p/original/${show.poster_path}`
                        : "/movies-app/poster-not-found.jpg"
                    }
                    width={"150px"}
                    alt={
                      (show.media_type === "movie" ? show.title : show.name) +
                      " poster"
                    }
                  />
                  <div>
                    <p>
                      <NavLink
                        className="text-white text-decoration-none"
                        to={
                          "/movies-app/" +
                          (show.media_type === "movie"
                            ? "movies/"
                            : "series/") +
                          show.id
                        }
                      >
                        {show.title ? show.title : show.name}
                        {show.release_date ? (
                          <>{" (" + show.release_date.slice(0, 4) + ")"}</>
                        ) : null}
                        {show.first_air_date ? (
                          <>{" (" + show.first_air_date.slice(0, 4) + ")"}</>
                        ) : null}
                      </NavLink>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
