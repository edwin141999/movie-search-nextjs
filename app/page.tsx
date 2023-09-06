"use client";
import { useEffect } from "react";
import { getMovieDetails } from "./api/tmdb_api";
import Card from "./components/card/page";
import Navbar from "./components/navbar/page";
import { MOVIES } from "./interface/movies";
import { setLoading } from "./redux/features/loadingSlice";
import { setMovie } from "./redux/features/movieSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function Home() {
  const movies = useAppSelector((state) => state.movieSlice);
  const dispatch = useAppDispatch();

  const urlBackImg = `https://image.tmdb.org/t/p/original${movies.backdrop_path}`;

  useEffect(() => {
    const getMovies = async (idMovie: number) => {
      dispatch(setLoading(true));
      const movies: MOVIES = await getMovieDetails(idMovie);
      dispatch(setMovie(movies));
      dispatch(setLoading(false));
    };

    getMovies(298618); //DEFAULT MOVIE - THE FLASH
  }, [dispatch]);

  return (
    <main
      className="bg-cover bg-center"
      // style={{
      //   backgroundImage: `url(${urlBackImg})`,
      // }}
    >
      {/*BACKDROP OPACITY*/}
      <div className="backdrop-opacity-10 backdrop-invert bg-black/50 px-52 py-8 min-h-screen">
        {/* NAVBAR */}
        <Navbar />
        {/* INFO MOVIE */}
        <Card />
      </div>
    </main>
  );
}
