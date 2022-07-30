export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const api_key = "7286ade9ed6168a4638a2a0d0d0fe0c8";
const tmdbDoman = "https://api.themoviedb.org/3/movie";
// https://api.themoviedb.org/3/movie/now_playing?api_key=7286ade9ed6168a4638a2a0d0d0fe0c8&page=1 --- movielist
// // https://api.themoviedb.org/3/movie/157336?api_key=7286ade9ed6168a4638a2a0d0d0fe0c8&append_to_response=videos --- movie detail
//`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&append_to_response=videos` -- credits
//     `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&append_to_response=videos`,
//  `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&append_to_response=videos`,
//`https://api.themoviedb.org/3/search/movie?api_key=7286ade9ed6168a4638a2a0d0d0fe0c8&query=${debounValue}&page=${nextPage}` -- search
export const tmdbApi = {
  getMovieList: (type, page = 1) =>
    `${tmdbDoman}/${type}?api_key=${api_key}&page=${page}`,
  getMovieDetails: (id) =>
    `${tmdbDoman}/${id}?api_key=${api_key}&append_to_response=videos`,
  getMovieCredits: (id) =>
    `${tmdbDoman}/${id}/credits?api_key=${api_key}&append_to_response=videos`,
  getVideos: (id) =>
    `${tmdbDoman}/${id}/videos?api_key=${api_key}&append_to_response=videos`,
  getSimilarVideos: (id) =>
    `${tmdbDoman}/${id}/similar?api_key=${api_key}&append_to_response=videos`,
  getImgOrinal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  getSearchMovie: (value, nextPage = 1) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}&page=${nextPage}`,
};
