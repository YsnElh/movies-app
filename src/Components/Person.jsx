import React, { useEffect, useState, useRef } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const pageRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const biographyRef = useRef(null);
  const knownForRef = useRef(null);

  const [pageInView, setPageInView] = useState(false);
  const [imageInView, setImageInView] = useState(false);
  const [infoInView, setInfoInView] = useState(false);
  const [biographyInView, setBiographyInView] = useState(false);
  const [knownForInView, setKnownForInView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchPerson({ id }));
    dispatch(fetchPersonCombinedCredits({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    const pageEl = pageRef.current;
    const imageEl = imageRef.current;
    const infoEl = infoRef.current;
    const biographyEl = biographyRef.current;
    const knownForEl = knownForRef.current;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const pageObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setPageInView(true);
    }, observerOptions);
    if (pageEl) pageObserver.observe(pageEl);

    const imageObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setImageInView(true);
    }, observerOptions);
    if (imageEl) imageObserver.observe(imageEl);

    const infoObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInfoInView(true);
    }, observerOptions);
    if (infoEl) infoObserver.observe(infoEl);

    const biographyObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setBiographyInView(true);
    }, observerOptions);
    if (biographyEl) biographyObserver.observe(biographyEl);

    const knownForObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setKnownForInView(true);
    }, observerOptions);
    if (knownForEl) knownForObserver.observe(knownForEl);

    return () => {
      if (pageRef.current) pageObserver.unobserve(pageRef.current);
      if (imageRef.current) imageObserver.unobserve(imageRef.current);
      if (infoRef.current) infoObserver.unobserve(infoRef.current);
      if (biographyRef.current) biographyObserver.unobserve(biographyRef.current);
      if (knownForRef.current) knownForObserver.unobserve(knownForRef.current);
    };
  }, [person]); 
  
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
        <main ref={pageRef} className={`person-page-container ${pageInView ? 'page-in-view' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
          <div className="hero-biography-wrapper">
            <section className="person-hero-section">
              <div ref={imageRef} className={`person-image-container ${imageInView ? 'image-in-view' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
                <img
                  src={
                    person.profile_path
                      ? imgSrcTMDB + person.profile_path
                      : "/movies-app/cast-img-not-found.jpg"
                  }
                  className="person-profile-image"
                  alt={person.name + " photo"}
                />
              </div>
              <div ref={infoRef} className={`person-info-section ${infoInView ? 'info-in-view' : ''}`}>
                <h1 className="person-name">{person.name}</h1>
                <h5 className="person-known-for"><b>Known for:</b> {person.known_for_department}</h5>
                {person.gender === 1 || person.gender === 2 ? (
                  <h5 className="person-gender"><b>Gender:</b> {person.gender === 1 ? "Female" : "Male"}</h5>
                ) : null}
                <h5 className="person-birthday"><b>Birthday:</b> {formatDate(person.birthday)}</h5>
                <h5 className="person-birthplace"><b>Place of Birth:</b> {person.place_of_birth}</h5>
                {person.also_known_as && person.also_known_as.length > 0 && (
                  <h5 className="person-also-known-as">
                    <b>Also Known As:</b>
                    <div className="person-also-known-as-list">
                      {person.also_known_as.map((n, i) => (
                        <span key={i} className="person-aka-item">{n}</span>
                      ))}
                    </div>
                  </h5>
                )}
              </div>
            </section>

            {/* Biography Section */}
            <section ref={biographyRef} className={`person-biography-section ${biographyInView ? 'biography-in-view' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
              <h3 className="section-title">Biography</h3>
              <div className="biography-content">
                {person.biography && person.biography.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="biography-paragraph" style={{ transitionDelay: isMobile ? '0s' : `${index * 0.1}s` }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* Known For / Stats Section */}
          {top10Credits.length > 0 && (
            <section ref={knownForRef} className={`person-known-for-section ${knownForInView ? 'known-for-in-view' : ''}`}>
              <h3 className="section-title">Known For</h3>
              <div className="person-known-for-grid">
                {top10Credits.map((show, index) => (
                  <NavLink to={
                      "/movies-app/" +
                      (show.media_type === "movie"
                        ? "movies/"
                        : "series/") +
                      show.id
                    }
                    key={show.id}
                    className={`known-for-card-link ${isMobile ? 'mobile' : 'desktop'}`}
                    style={{ transitionDelay: isMobile ? '0s' : `${index * 0.08}s` }}
                  >
                    <div className="known-for-card">
                      <img
                        src={
                          show.poster_path
                            ? `https://image.tmdb.org/t/p/original/${show.poster_path}`
                            : "/movies-app/poster-not-found.jpg"
                        }
                        className="known-for-poster"
                        alt={
                          (show.media_type === "movie" ? show.title : show.name) +
                          " poster"
                        }
                      />
                      <div className="known-for-details">
                        <p className="known-for-title">
                          {show.title ? show.title : show.name}
                        </p>
                        <p className="known-for-year">
                          {show.release_date ? (
                            <>{" (" + show.release_date.slice(0, 4) + ")"}</>
                          ) : null}
                          {show.first_air_date ? (
                            <>{" (" + show.first_air_date.slice(0, 4) + ")"}</>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </section>
          )}
        </main>
      ) : null}
      {error && (
        <div className="display-4 text-light" style={{ textAlign: "center" }}>
          {error}
        </div>
      )}
    </>
  );
};