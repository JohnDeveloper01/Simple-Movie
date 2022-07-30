import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { entries } from "lodash";
import LazyLoadingImage from "../LazyLoading/LazyLoadingImage";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { data } = useSWR(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=7286ade9ed6168a4638a2a0d0d0fe0c8",
    fetcher
  );
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data?.results) setMovies(data.results);
  }, [data?.results]);

  return (
    <section className="banner page-container h-[500px] mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
//   src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
const BannerItem = ({ item }) => {
  const { title, backdrop_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <LazyLoadingImage
        url={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        className="h-full w-full object-cover object-center rounded-lg transition-all"
      ></LazyLoadingImage>
      <div className="banner-content absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md ">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md ">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md ">
            Adventure
          </span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} className={"w-auto"}>
          Watch now
        </Button>
      </div>
    </div>
  );
};
export default Banner;
