import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <section className="movie-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Now Playing
        </h2>
        <MovieList queryApi="now_playing"></MovieList>
      </section>
      {/* top rate */}
      <section className="movie-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          top rated Movies
        </h2>
        <MovieList queryApi="top_rated"></MovieList>
      </section>
      {/* trending */}
      <section className="movie-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          trending movies
        </h2>
        <MovieList queryApi="popular"></MovieList>
      </section>
    </>
  );
};

export default HomePage;
