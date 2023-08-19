"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMovieDetails } from "./api/tmdb_api";
import { MOVIES } from "./interface/movies";

export default function Home() {
  const [movies, setMovies] = useState<MOVIES>();

  useEffect(() => {
    const getMovies = async () => {
      const movies: MOVIES = await getMovieDetails(298618);
      setMovies(movies);
      console.log(movies);
    };
    getMovies();
  }, []);

  return (
    <main>
      <div>
        <input type="search" />
      </div>
      <div>
        <p>PHOTO</p>
        <Image
          src={`https://image.tmdb.org/t/p/original${movies?.poster_path}`}
          alt="movie photo"
          width={300}
          height={300}
        />
        <p>TITLE</p>
        <p>{movies?.title}</p>
        <p>TAG LINE</p>
        <p>{movies?.tagline}</p>
        <p>OVERVIEW</p>
        <p>{movies?.overview}</p>
        <p>GENRES</p>
        {movies?.genres.map((genre) => {
          return <p key={genre.id}>{genre.name}</p>;
        })}
        <p>PRODUCTION COMPANIES</p>
        {movies?.production_companies.map((company) => {
          return <p key={company.id}>{company.name}</p>;
        })}
        <p>ORIGINAL RELEASE</p>
        <p>{movies?.release_date}</p>
        <p>RUNNING TIME</p>
        <p>{movies?.runtime} mins</p>
        <p>BOX OFFICE</p>
        <p>
          ${movies?.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p>VOTE AVERAGE</p>
        <p>{movies?.vote_average} / 10</p>
      </div>
    </main>
  );
}
