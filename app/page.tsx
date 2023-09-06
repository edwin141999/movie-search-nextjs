"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/page";
import { setLoading } from "./redux/features/loadingSlice";
import { setMovie } from "./redux/features/movieSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function Home() {
  const movies = useAppSelector((state) => state.movieSlice);
  const loading = useAppSelector((state) => state.loadingSlice);
  const dispatch = useAppDispatch();


  let urlBackImg = `https://image.tmdb.org/t/p/original${movies.backdrop_path}`;

  useEffect(() => {
    const getMovies = async (idMovie: number) => {
      dispatch(setLoading(true));
      fetch(`/api/getMoviesDetails?movieId=${idMovie}`)
        .then((res) => res.json())
        .then((data) => dispatch(setMovie(data)))
        .catch((err) => console.log(err));
      dispatch(setLoading(false));
    };
    getMovies(298618); //DEFAULT MOVIE - THE FLASH
  }, [dispatch]);

  return (
    <main
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${urlBackImg})`,
      }}
    >
      {/*BACKDROP OPACITY*/}
      <div className="backdrop-opacity-10 backdrop-invert bg-black/50 px-52 py-8 min-h-screen">
        {/* NAVBAR */}
        <Navbar />
        {/* INFO MOVIE */}
        {/* <Card /> */}
      </div>
    </main>
  );
}
