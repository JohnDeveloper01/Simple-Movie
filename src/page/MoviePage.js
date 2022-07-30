import React, { useEffect, useState, lazy, Suspense } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import SkeletonLoading from "../components/skeleton/SkeletonLoading";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { fetcher, tmdbApi } from "../config";
import Button from "../components/button/Button";
const itemsPerPage = 20;
const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [url, setUrl] = useState(tmdbApi.getMovieList("popular", nextPage));
  const handleFilerChange = (e) => {
    setFilter(e.target.value);
  };
  const debounValue = useDebounce(filter, 500);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    setUrl(
      debounValue
        ? tmdbApi.getSearchMovie(debounValue, nextPage)
        : tmdbApi.getMovieList("popular", nextPage)
    );
    setItemOffset(itemsPerPage);
    if (data) setMovie(data?.results || []);
  }, [debounValue, data, nextPage]);
  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, [nextPage]);
  useEffect(() => {
    if (!data || !data.total_pages) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 rounded-lg bg-slate-800 outline-none text-white"
            placeholder="Type here to search..."
            onChange={handleFilerChange}
          />
        </div>
        <button className="p-4 bg-primary text-white rounded-lg">
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
      <div className="grid grid-cols-4 gap-10">
        {loading &&
          movie?.length > 0 &&
          movie.map((item) => (
            <SkeletonLoading key={item?.id.toFixed(0)}></SkeletonLoading>
          ))}
        {!loading &&
          movie?.length > 0 &&
          movie.map((item) => (
            <MovieCard item={item} key={item?.id}></MovieCard>
          ))}
      </div>

      {/* pagigations */}
      {movie.length > 0 && (
        <div className="mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel={
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
            className="pagination"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
};

export default MoviePage;
