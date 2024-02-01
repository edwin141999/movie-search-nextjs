"use client";
import { useEffect } from "react";
import Navbar from "./components/navbar/page";
import { setLoading } from "./redux/features/loadingSlice";
import { setMovie } from "./redux/features/movieSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { MOVIES } from "./interface/movies";
import Card from "./components/card/page";

export default function Home() {
  const movies = useAppSelector((state) => state.movieSlice);
  const dispatch = useAppDispatch();

  let urlBackImg = `https://image.tmdb.org/t/p/original${movies.backdrop_path}`;

  const getMovieDetails = async (idMovie: number) => {
    const result:MOVIES = await fetch(`/api/getMoviesDetails?movieId=${idMovie}`)
      .then((res) => res.json())
      .then((data) => {return data})
      .catch((err) => console.log(err));
    console.log('VER QUE SALE =>', result);
    
    return result;
  }

  useEffect(() => {
    const getMovies = async (idMovie: number) => {
      dispatch(setLoading(true));
      const movie = await getMovieDetails(idMovie);
      dispatch(setMovie(movie));
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
        <Card />
      </div>
    </main>
  );
}
