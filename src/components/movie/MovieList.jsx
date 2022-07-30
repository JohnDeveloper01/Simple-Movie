import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";
import MovieCard from "./MovieCard";

// https://api.themoviedb.org/3/movie/now_playing?api_key=7286ade9ed6168a4638a2a0d0d0fe0c8
const MovieList = ({ queryApi = "now_playing" }) => {
  const { data, error } = useSWR(tmdbApi.getMovieList(queryApi), fetcher);
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    if (data?.results) setMovie(data.results);
  }, [data?.results]);
  // console.log(movie);

  return (
    <div className="movie-list w-full">
      <Swiper spaceBetween={40} slidesPerView={4} grabCursor={"true"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
