import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import LazyLoadingImage from "../components/LazyLoading/LazyLoadingImage";
import MovieCard from "../components/movie/MovieCard";

import { fetcher, tmdbApi } from "../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  // console.log(movieId);
  const [dataMovie, setDataMovie] = useState([]);
  const { data } = useSWR(tmdbApi.getMovieDetails(movieId), fetcher);
  useEffect(() => {
    if (data) setDataMovie(data);
  }, [data]);
  useEffect(() => {
    const body = document.querySelector("#root");

    body.scrollIntoView({
      behavior: "smooth",
    });
  }, [movieId]);
  const { genres, overview } = dataMovie;

  return (
    <>
      <div className="py-10">
        <div className="w-full h-[600px] relative">
          <div className="overlay bg-black bg-opacity-70 absolute inset-0"></div>
          <div
            className="w-full h-full bg-cover object-cover bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${dataMovie?.backdrop_path})`,
            }}
          ></div>
        </div>
        <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 p-10 ">
          <LazyLoadingImage
            url={tmdbApi.getImgOrinal(dataMovie?.poster_path)}
            className="h-full w-full object-cover rounded-xl"
          ></LazyLoadingImage>
        </div>
        <h1 className="text-center text-white text-4xl font-bold shadow-sm mb-10">
          {dataMovie?.title}
        </h1>
        {dataMovie?.genres?.length > 0 && (
          <div className="flex items-center gap-x-5 mb-10 justify-center">
            {genres.map((item) => (
              <span
                className="py-2 px-6 border border-primary text-primary rounded-lg"
                key={item.id}
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-center leading-7 max-w-[600px] mx-auto mb-10">
          {overview}
        </p>
        <MovieCredits></MovieCredits>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
      </div>
    </>
  );
};
const MovieCredits = () => {
  const { movieId } = useParams();

  const [dataCredits, setDataCredits] = useState([]);
  const { data } = useSWR(tmdbApi.getMovieCredits(movieId), fetcher);
  useEffect(() => {
    if (data) setDataCredits(data);
  }, [data]);
  const { cast } = dataCredits;
  if (!cast || cast.length < 0) return null;

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10 shadow-sm">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <LazyLoadingImage
              className={"w-full h-[350px] object-cover rounded-lg"}
              url={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
            />
            <h3 className="text-xl text-center font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const MovieVideo = () => {
  const { movieId } = useParams();
  // console.log(movieId);
  const [dataVideos, setDataVideos] = useState([]);
  const { data } = useSWR(tmdbApi.getVideos(movieId), fetcher);
  useEffect(() => {
    if (data) setDataVideos(data);
  }, [data]);

  const { results } = dataVideos;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id} className="">
            <h3 className="mb-5 text-xl font-medium py-2 px-4 bg-primary inline-block rounded-lg">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const MovieSimilar = () => {
  const { movieId } = useParams();
  // console.log(movieId);
  const [dataSimilarVideos, setDataSimilarVideos] = useState([]);
  const { data } = useSWR(tmdbApi.getSimilarVideos(movieId), fetcher);
  useEffect(() => {
    if (data) setDataSimilarVideos(data);
  }, [data]);
  const { results } = dataSimilarVideos;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10 movies-similar">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <Swiper spaceBetween={40} slidesPerView={4} grabCursor={"true"}>
        {results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default MovieDetailPage;
