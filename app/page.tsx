"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMovieDetails, getSearchMovie } from "./api/tmdb_api";
import {
  INFOMOVIERESULTS,
  MOVIES,
  MOVIESEARCH,
  MOVIESEARCHRESULTS,
} from "./interface/movies";

export default function Home() {
  const [movies, setMovies] = useState<MOVIES>();
  const [searchMovie, setSearchMovie] = useState<MOVIESEARCHRESULTS[]>();
  const [infoMovie, setInfoMovie] = useState<INFOMOVIERESULTS[]>();
  const [selectMovie, setSelectMovie] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();

  const urlBackImg = `https://image.tmdb.org/t/p/original${movies?.backdrop_path}`;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectMovie(e.target.value);
    if (e.target.value === "") {
      setInfoMovie([]);
      return;
    }
    const movie: MOVIESEARCH = await getSearchMovie(e.target.value);
    setSearchMovie(movie.results.slice(0, 5));
    setInfoMovie(
      searchMovie?.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
        };
      })
    );
  };

  const getMovies = async (idMovie: number) => {
    setLoading(true);
    const movies: MOVIES = await getMovieDetails(idMovie);
    setMovies(movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies(298618); //DEFAULT MOVIE - THE FLASH
  }, []);

  return (
    <main
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${urlBackImg})`,
      }}
    >
      <div className="backdrop-opacity-10 backdrop-invert bg-black/40 px-52 py-8">
        {/*BACKDROP OPACITY*/}
        {/* NAVBAR */}
        <div className="w-full flex flex-col text-black bg-red-500">
          <div className="bg-blue-500 w-full flex justify-between">
            <Image
              src={"/logo.png"}
              alt="logo picture"
              width={130}
              height={130}
            />
            <input
              type="text"
              placeholder="Search for a movie"
              value={selectMovie}
              onChange={handleSearch}
              className="border border-gray-400 rounded-md p-2 w-7/12"
            />
            {infoMovie?.length! > 0 && (
              <ul
                id="infomovie_list"
                className="bg-white border-[1px] rounded-lg p-4 absolute z-10"
              >
                {infoMovie?.map((movie) => {
                  return (
                    <li
                      key={movie.id}
                      className="min-h-0 w-full border-solid border-l-gray-300 py-1 break-words hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectMovie(movie.title);
                        getMovies(movie.id);
                        setInfoMovie([]);
                      }}
                    >
                      {movie.title}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {/* INFO MOVIE */}
        <div className="pt-10">
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <article className="flex flex-row bg-black/80 backdrop-opacity-10 backdrop-invert">
              <Image
                src={`https://image.tmdb.org/t/p/original${movies?.poster_path}`}
                alt="movie photo"
                width={390}
                height={390}
              />
              <div className="px-7 flex flex-col justify-evenly">
                <h1 className="uppercase font-bold text-4xl font-lato">
                  {movies?.title}
                </h1>
                <span className="text-xl text-green-400 font-light font-oswald">
                  {movies?.tagline}
                </span>
                <p className="font-lato text-base font-light">
                  {movies?.overview}
                </p>
                <div>
                  <div className="flex flex-row">
                    {movies?.genres.map((genre) => {
                      return (
                        <span
                          key={genre.id}
                          className="text-green-400 font-oswald font-light text-2xl"
                        >
                          {genre.name} &nbsp;
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex flex-row">
                    {movies?.production_companies.map((company) => {
                      return (
                        <span
                          key={company.id}
                          className="font-oswald font-light"
                        >
                          {company.name} &nbsp;
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 font-oswald font-light">
                  <div>
                    <p>Original Release:</p>
                    <span className="text-green-400 text-2xl">
                      {movies?.release_date}
                    </span>
                  </div>
                  <div>
                    <p>Running Time:</p>
                    <span className="text-green-400 text-2xl">
                      {movies?.runtime} mins
                    </span>
                  </div>
                  <div>
                    <p>Box Office:</p>
                    <span className="text-green-400 text-2xl">
                      $
                      {movies?.revenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                  <div>
                    <p>Vote Average:</p>
                    <span className="text-green-400 text-2xl">
                      {movies?.vote_average} / 10
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
}
