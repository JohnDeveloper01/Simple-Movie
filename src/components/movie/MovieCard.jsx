import React from "react";
import PropTypes from "prop-types"; // ES6
import LazyLoadingImage from "../LazyLoading/LazyLoadingImage";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, backdrop_path, poster_path, id } =
    item;
  const navigate = useNavigate();
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white w-full h-full flex flex-col select-none">
      <LazyLoadingImage
        url={`https://image.tmdb.org/t/p/w500/${backdrop_path || poster_path}`}
        className={"w-full h-[250px] object-cover rounded-lg mb-5"}
      ></LazyLoadingImage>
      <div className="flex flex-col flex-1 items-start">
        <h3 className="text-white mb-3 text-xl capitalize w-full h-full ">
          {title}
        </h3>
        <div className="flex flex-col w-full flex-1 h-full mt-auto">
          <div className="flex items-center justify-between text-sm opacity-70 mt-10 mb-5  flex-1 w-full">
            <span>{new Date(release_date).getFullYear()}</span>
            <span className="flex items-center gap-x-1">
              {vote_average.toFixed(1)}
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.66713 1.02447C7.7719 0.702008 8.2281 0.702009 8.33287 1.02447L9.71753 5.28602C9.76439 5.43023 9.89877 5.52786 10.0504 5.52786H14.5313C14.8703 5.52786 15.0113 5.96173 14.737 6.16102L11.1119 8.7948C10.9892 8.88393 10.9379 9.04191 10.9847 9.18612L12.3694 13.4477C12.4742 13.7701 12.1051 14.0383 11.8308 13.839L8.20572 11.2052C8.08305 11.1161 7.91695 11.1161 7.79428 11.2052L4.16918 13.839C3.89488 14.0383 3.52581 13.7701 3.63059 13.4477L5.01525 9.18612C5.06211 9.04191 5.01078 8.88393 4.88811 8.7948L1.26301 6.16102C0.988711 5.96173 1.12968 5.52786 1.46874 5.52786H5.9496C6.10123 5.52786 6.23561 5.43023 6.28247 5.28602L7.66713 1.02447Z"
                  stroke="#EAB39D"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </div>
          <Button bgColor="primary" onClick={() => navigate(`/movies/${id}`)}>
            Watch now
          </Button>
        </div>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
function FallbackComponent() {
  return (
    <p className="text-red-500">Something went wrong with this component</p>
  );
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent: FallbackComponent,
});
