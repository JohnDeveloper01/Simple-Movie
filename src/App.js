import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import "react-loading-skeleton/dist/skeleton.css";
import React, { lazy, Suspense } from "react";
import Main from "./components/layout/Main";
import NotFoundPage from "./page/NotFoundPage";

const HomePage = lazy(() => import("./page/HomePage"));
const MovieDetailPage = lazy(() => import("./page/MovieDetailPage"));
const MoviePageV2 = lazy(() => import("./page/MoviePageV2"));
function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
