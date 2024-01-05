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
    };

    return languageNames[languageCode] || languageCode;
  }
  return (
    <div className="movie-other-info">
      <div className="other-info1">
        <div className="other-info1-cast">
          <h3>Top Billed Cast</h3>
          <div className="casts-cards">
            {movieCasts?.map((cast) => (
              <div key={cast.id} className="cats-card-one">
                <img
                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
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
        </div>
        <div className="other-info1-recommendations">
          <h3 className="mt-3">Recommendations:</h3>
          <div className="recommendations-cards">
            {showRecommendations?.map((show) =>
              show.poster_path ? (
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
                      src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
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
              ) : null
            )}
          </div>
        </div>
      </div>
      <div className="other-info2">
        <div className="other-info2-socialmedia">
          <a
            href={
              externalIDs?.facebook_id
                ? `https://web.facebook.com/${externalIDs?.facebook_id}/`
                : null
            }
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href={
              externalIDs?.instagram_id
                ? `https://www.instagram.com/${externalIDs?.instagram_id}/`
                : null
            }
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href={
              externalIDs?.twitter_id
                ? `https://twitter.com/${externalIDs?.twitter_id}/`
                : null
            }
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href={
              externalIDs?.imdb_id
                ? `https://www.imdb.com/title/${externalIDs?.imdb_id}/`
                : null
            }
          >
            <i className="fab fa-imdb"></i>
          </a>
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
            <h3>KeyWords</h3>
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
                      src={`https://image.tmdb.org/t/p/original/${e.profile_path}`}
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
              {show?.seasons?.map((sais) => (
                <div key={sais.id} className="saisons-card-one">
                  {sais.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${sais.poster_path}`}
                      alt={"poster of: " + show?.name + sais.name}
                    />
                  ) : null}
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
              ))}
            </div>
          </div>
        ) : null}
        <div className="other-info1-prodcom">
          <h4 className="mt-3">Production Companies</h4>
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
