import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  fetchPerson,
  fetchPersonCombinedCredits,
} from "../features/persons/singlePersonSlice";
import { LoadingOverlay } from "./LoadingOverlay";

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

  const top10Creadits = combinedCredits.cast
    ? combinedCredits.cast
        .filter((cast) => cast.vote_count > 200)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 10)
    : [];

  return (
    <>
      {loading && <LoadingOverlay />}
      {!loading && !error && person ? (
        <h1 className="text-white">{person.name}</h1>
      ) : null}
    </>
  );
};
