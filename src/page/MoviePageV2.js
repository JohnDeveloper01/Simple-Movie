import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import MovieCard from "../components/movie/MovieCard";
import SkeletonLoading from "../components/skeleton/SkeletonLoading";
import { fetcher, tmdbApi } from "../config";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";
import { v4 as uuidv4 } from "uuid";
const itemsPerPage = 20;
const MoviePage = () => {
  const [url, setUrl] = useState(tmdbApi.getMovieList("popular")); //return string url
  const inputRef = useRef();
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  ); //-----> : return array contains data from url
  const movie = data
    ? data.reduce((sumData, item) => sumData.concat(item.results), [])
    : [];
  const isLoading = !data && !error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const handlerSearch = () => {
    if (inputRef.current.value) {
      setUrl(tmdbApi.getSearchMovie(inputRef.current.value));
    }
  };
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  console.log(isReachingEnd);
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 rounded-lg bg-slate-800 outline-none text-white"
            placeholder="Type here to search..."
            ref={inputRef}
          />
        </div>
        <button
          className="p-4 bg-primary text-white rounded-lg"
          onClick={handlerSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {movie.length === 0 && (
        <p className="text-center text-red-500 font-medium">
          There is no movie you are looking for
        </p>
      )}
      <div className="grid grid-cols-4 gap-10">
        {isLoadingMore &&
          movie?.length > 0 &&
          movie.map(() => <SkeletonLoading key={uuidv4()}></SkeletonLoading>)}
        {!isLoadingMore &&
          movie?.length > 0 &&
          movie.map((item) => (
            <MovieCard item={item} key={uuidv4()}></MovieCard>
          ))}
      </div>
      <Button
        className="!mt-10 w-auto block mx-auto disabled:bg-secondary"
        onClick={() => setSize(size + 1)}
        disabled={isLoadingMore || isReachingEnd}
      >
        Load more
      </Button>
    </div>
  );
};

export default MoviePage;
