import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchmovieReviews } from "../features/movies/moviesReviews";
import { fetchshowRecommendations } from "../features/movies/showRecommendations";
import { fetchshowshowExternalIDS } from "../features/movies/showExtrIds";
import { fetchshowkeywords } from "../features/movies/getKeywords";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import StarRating from "./comps/StarRating";

export const ShowInfo = (props) => {
  const { casts, show, type } = props;
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchmovieReviews({ id, type: type }));
  }, [dispatch, id, type]);

  useEffect(() => {
    dispatch(fetchshowRecommendations({ id, type: type }));
  }, [dispatch, id, type]);

  useEffect(() => {
    dispatch(fetchshowshowExternalIDS({ id, type: type }));
  }, [dispatch, id, type]);
  useEffect(() => {
    dispatch(fetchshowkeywords({ id, type: type }));
  }, [dispatch, id, type]);

  let MovieReviews = useSelector(
    (state) => state.movieReviews.movieReviews.results
  );
  let showRecommendations = useSelector(
    (state) => state.showRecommendations.showRecommendations.results
  );
  let externalIDs = useSelector(
    (state) => state.showExternalIDs.showExternalIDS
  );
  let movieKeywords = useSelector((state) => state.keywords.keywords.keywords);

  let movieCasts = casts;
  //let currentReview = null;

  const currentReview = useMemo(() => {
    if (MovieReviews && MovieReviews.length > 0) {
      return MovieReviews[currentReviewIndex % MovieReviews.length];
    }
    return null;
  }, [MovieReviews, currentReviewIndex]);

  const handleReloadReview = () => {
    setCurrentReviewIndex((prevIndex) => prevIndex + 1);
  };

  //-----------TEXT REVIEW HANDLE-----------
  const MAX_CHARACTERS = 1050;
  const reviewContent = currentReview?.content;

  const renderText = () => {
    if (reviewContent && reviewContent?.length > MAX_CHARACTERS) {
      const truncatedText = reviewContent.substring(0, MAX_CHARACTERS);
      return (
        <div>
          <p className="review-text">
            {truncatedText + "... "}
            <a href={currentReview?.url} target="_blank" rel="noreferrer">
              Read the rest <i className="fas fa-external-link-alt"></i>
            </a>
          </p>
        </div>
      );
    } else {
      return <p className="review-text">{reviewContent}</p>;
    }
  };

  //----------------------------
  let formattedDate = null;
  let createdDate = new Date("2023-11-18T00:23:13.374Z");

  if (!isNaN(createdDate)) {
    formattedDate = createdDate.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "medium",
      timeZone: "UTC",
    });
  } else {
    console.error("Invalid date format date");
  }
  function getLanguageName(languageCode) {
    const languageNames = {
      en: "English",
      ar: "Arabic",
      fr: "French",
      ja: "Japanese",
      es: "Spanish",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      zh: "Chinese",
      ru: "Russian",
      hi: "Hindi",
      ko: "Korean",
      tr: "Turkish",
      nl: "Dutch",
      sv: "Swedish",
      pl: "Polish",
      id: "Indonesian",
      vi: "Vietnamese",
      th: "Thai",
      he: "Hebrew",
      el: "Greek",
      cs: "Czech",
      da: "Danish",
      fi: "Finnish",
      no: "Norwegian",
      ro: "Romanian",
      hu: "Hungarian",
      bg: "Bulgarian",
      hr: "Croatian",
      sl: "Slovenian",
      sk: "Slovak",
      ms: "Malay",
      fil: "Filipino",
      uk: "Ukrainian",
      et: "Estonian",
      lv: "Latvian",
      lt: "Lithuanian",
      sr: "Serbian",
      mk: "Macedonian",
      sq: "Albanian",
      bs: "Bosnian",
      mt: "Maltese",
      is: "Icelandic",
      ga: "Irish",
      cy: "Welsh",
      gd: "Scottish Gaelic",
      mi: "Māori",
      haw: "Hawaiian",
      to: "Tongan",
      sm: "Samoan",
      fj: "Fijian",
      ur: "Urdu",
      bn: "Bengali",
      gu: "Gujarati",
      te: "Telugu",
      ta: "Tamil",
      ml: "Malayalam",
      kn: "Kannada",
      mr: "Marathi",
      pa: "Punjabi",
      ne: "Nepali",
      si: "Sinhalese",
      km: "Khmer",
      lo: "Lao",
      my: "Burmese",
      ka: "Georgian",
      hy: "Armenian",
      az: "Azerbaijani",
      uz: "Uzbek",
      ky: "Kyrgyz",
      tk: "Turkmen",
      tg: "Tajik",
      kk: "Kazakh",
      mn: "Mongolian",
      ps: "Pashto",
      fa: "Persian",
      ku: "Kurdish",
      arq: "Algerian Arabic",
      ars: "Najdi Arabic",
      arc: "Aramaic",
      am: "Amharic",
      tig: "Tigrinya",
      or: "Odia",
      as: "Assamese",
      kok: "Konkani",
      mai: "Maithili",
      mni: "Manipuri",
      kokborok: "Kokborok",
      dz: "Dzongkha",
      kmr: "Kurmanji",
      ty: "Tahitian",
      moh: "Mohawk",
      kaw: "Kawi",
      chr: "Cherokee",
      cho: "Choctaw",
      iro: "Iroquoian languages",
      nhu: "Nahuatl",
      yua: "Yucatec Maya",
      quc: "K'iche'",
      qut: "Q'eqchi'",
      aym: "Aymara",
      grn: "Guarani",
      tup: "Tupi",
      cai: "Central American Indian languages",
      nai: "North American Indian languages",
      sai: "South American Indian languages",
    };

    return languageNames[languageCode] || languageCode;
  }

  const svgStyle = {
    fill: "white",
    width: "53px",
    marginBottom: "7px",
  };
  return (
    <div className="movie-other-info">
      <div className="other-info1">
        <div className="other-info1-cast">
          <h3>Top Billed Cast</h3>
          <div className="casts-cards">
            {movieCasts?.map((cast) => (
              <div key={cast.id} className="cats-card-one">
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                      : "/movies-app/cast-img-not-found.jpg"
                  }
                  alt={"image of the actor: " + cast.original_name}
                />
                <div className="casts-card-details">
                  <p>{cast.original_name}</p>
                  <div>{cast.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="other-info1-reviews">
          <h3 className="mt-3">Reviews</h3>
          {MovieReviews?.length > 0 ? (
            <div className="review">
              <h4>
                A review by: {currentReview?.author + " "}
                <i
                  title="load other review"
                  onClick={handleReloadReview}
                  className="fas fa-redo button-review"
                ></i>
              </h4>
              {renderText()}
              <StarRating
                rating={
                  currentReview?.author_details?.rating
                    ? currentReview?.author_details?.rating
                    : 0
                }
              />
              <p>{formattedDate ? formattedDate : null}</p>
            </div>
          ) : (
            <div className="review">
              <h4>Reviews Are not Available</h4>
            </div>
          )}
        </div>
        <div className="other-info1-recommendations">
          <h3 className="mt-3">Recommendations:</h3>
          <div className="recommendations-cards">
            {showRecommendations?.length > 0 ? (
              showRecommendations?.map((show) => (
                <NavLink
                  key={show.id}
                  to={
                    show.title === undefined
                      ? `/movies-app/series/${show.id}`
                      : `/movies-app/movies/${show.id}`
                  }
                >
                  <div className="recommendations-card-one">
                    <img
                      src={
                        show.poster_path
                          ? `https://image.tmdb.org/t/p/original/${show.poster_path}`
                          : "/movies-app/poster-not-found.jpg"
                      }
                      alt={
                        "poster of the show: " + show.title
                          ? show.title
                          : show.name
                      }
                    />
                    <div className="recommendations-card-details">
                      <p>{show.title ? show.title : show.name}</p>
                    </div>
                  </div>
                </NavLink>
              ))
            ) : (
              <h4>Recommendations are not available</h4>
            )}
          </div>
        </div>
      </div>
      <div className="other-info2">
        <h3>Social Links:</h3>
        <div className="other-info2-socialmedia">
          {externalIDs?.facebook_id ? (
            <a href={`https://web.facebook.com/${externalIDs?.facebook_id}/`}>
              <i className="fab fa-facebook"></i>
            </a>
          ) : null}
          {externalIDs?.instagram_id ? (
            <a href={`https://www.instagram.com/${externalIDs?.instagram_id}/`}>
              <i className="fab fa-instagram"></i>
            </a>
          ) : null}
          {externalIDs?.twitter_id ? (
            <a
              href={`https://twitter.com/${externalIDs?.twitter_id}/`}
              style={{ margin: "1px" }}
            >
              <svg
                version="1.1"
                id="svg5"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1668.56 1221.19"
                style={{
                  enableBackground: "new 0 0 1668.56 1221.19",
                  ...svgStyle,
                }}
                xmlSpace="preserve"
              >
                <g id="layer1" transform="translate(52.390088,-25.058597)">
                  <path
                    id="path1009"
                    d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99 h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                  />
                </g>
              </svg>
            </a>
          ) : null}
          {externalIDs?.imdb_id ? (
            <a href={`https://www.imdb.com/title/${externalIDs?.imdb_id}/`}>
              <i className="fab fa-imdb"></i>
            </a>
          ) : null}
        </div>
        <hr />
        <div className="other-info2-usd">
          <h4>Status: </h4>
          <div>•{show?.status}</div>

          <h4>Original Language: </h4>
          <div>•{getLanguageName(show?.original_language)}</div>
          {show?.budget > 0 && (
            <div>
              <h4>Budget:</h4>
              <div>•{show?.budget.toLocaleString()} $</div>
            </div>
          )}
          {show?.revenue > 0 && (
            <div>
              <h4>Revenue:</h4>
              <div>•{show?.revenue?.toLocaleString()} $</div>
            </div>
          )}
        </div>
        <hr />
        {type === "movie" ? (
          <div className="other-info2-keywords">
            <h3>KeyWords:</h3>
            {movieKeywords && movieKeywords?.length > 0
              ? movieKeywords?.map((keyword, index) => (
                  <span key={keyword.id} className="keyword">
                    {keyword.name}
                    {index < movieKeywords?.length - 1 && ","}{" "}
                  </span>
                ))
              : null}
          </div>
        ) : (
          <div className="other-info2-createdby">
            <h3>{show.name} Directors</h3>
            <div className="directors">
              {show?.created_by?.length > 0 ? (
                show?.created_by?.map((e) => (
                  <div key={e.id}>
                    <img
                      src={
                        e.profile_path
                          ? `https://image.tmdb.org/t/p/original/${e.profile_path}`
                          : "/movies-app/cast-img-not-found.jpg"
                      }
                      style={{ width: "120px" }}
                      alt={"Profile image of: " + e.name}
                    />
                    <p>{e.name}</p>
                  </div>
                ))
              ) : (
                <div>Not available</div>
              )}
            </div>
          </div>
        )}
        {type === "tv" ? (
          <div className="other-info1-saisons">
            <h3 className="mt-3">Saisons:</h3>
            <div className="saisons-cards">
              {show?.seasons?.length > 0 ? (
                show?.seasons?.map((sais) => (
                  <div key={sais.id} className="saisons-card-one">
                    <img
                      src={
                        sais.poster_path
                          ? `https://image.tmdb.org/t/p/original/${sais.poster_path}`
                          : "/movies-app/poster-not-found.jpg"
                      }
                      alt={"poster of: " + show?.name + sais.name}
                    />
                    <div className="saisons-card-details">
                      <p>{sais.name}</p>
                      <p>Number Eps: {sais.episode_count}</p>
                      <p>
                        {sais.air_date &&
                          new Date(sais.air_date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h4>Saisons informations are not available</h4>
              )}
            </div>
          </div>
        ) : null}
        <div className="other-info1-prodcom">
          <h4 className="mt-3">Production Companies:</h4>
          {show?.production_companies?.length > 0
            ? show?.production_companies?.map((e) => (
                <div key={e.id} className="prodcom-single">
                  {e.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                      alt={"logo of: " + e.name}
                    />
                  ) : null}
                  <span>{" " + e.name}</span>
                  <span>{" - " + e.origin_country}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
