import { configureStore } from "@reduxjs/toolkit";
import { initializeFavourites } from "../features/favourites/favouritesShowSlice";
import moviesPopularSlice from "../features/movies/moviesPopularSlice";
import seriesSlice from "../features/series/seriesSlice";
import seriesSearchSlice from "../features/series/seriesSearchSlice";
import moviesSearchSlice from "../features/movies/moviesSearchSlice";
import movieOneSlice from "../features/movies/movieOneSlice";
import serieOneSlice from "../features/series/serieOneSlice";
import actionMoviesSlice from "../features/movies/actionMoviesSlice";
import comedyMoviesSlice from "../features/movies/comedyMoviesSlice";
import favouritesShowSlice from "../features/favourites/favouritesShowSlice";
import topRatedMoviesSlice from "../features/movies/topRatedMoviesSlice";
import topRatedSeriesSlice from "../features/series/topRatedSeriesSlice";
import movieOneGetAllBackdrops from "../features/movies/movieOneGetAllBackdrops";
import serieOneGetAllBackdrops from "../features/series/serieOneGetAllBackdrops";
import darkModeSlice from "../features/favourites/darkModeSlice";
import getMovieCrewSlice from "../features/movies/getMovieCrewSlice";
import moviesReviews from "../features/movies/moviesReviews";
import showRecommendations from "../features/movies/showRecommendations";
import showExtrIds from "../features/movies/showExtrIds";
import getKeywords from "../features/movies/getKeywords";

const store = configureStore({
  reducer: {
    moviesPopular: moviesPopularSlice,
    moviesSearch: moviesSearchSlice,
    series: seriesSlice,
    seriesSearch: seriesSearchSlice,
    movie: movieOneSlice,
    serie: serieOneSlice,
    actionMovies: actionMoviesSlice,
    comedyMovies: comedyMoviesSlice,
    favouritesShow: favouritesShowSlice,
    topRatedMovies: topRatedMoviesSlice,
    topRatedSeries: topRatedSeriesSlice,
    movieAllBackdrops: movieOneGetAllBackdrops,
    serieAllBackdrops: serieOneGetAllBackdrops,
    darkMode: darkModeSlice,
    movieCrew: getMovieCrewSlice,
    movieReviews: moviesReviews,
    showRecommendations: showRecommendations,
    showExternalIDs: showExtrIds,
    keywords: getKeywords,
  },
});

store.dispatch(initializeFavourites());

export default store;
