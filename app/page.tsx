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
  const [loading, setLoading] = useState<boolean>(true);

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
      {/*BACKDROP OPACITY*/}
      <div className="backdrop-opacity-10 backdrop-invert bg-black/50 px-52 py-8 min-h-screen">
        {/* NAVBAR */}
        <section className="flex justify-between items-center">
          <Image
            src={"/logo.png"}
            alt="logo picture"
            width={130}
            height={130}
          />
          <div className="relative w-7/12">
            <input
              type="text"
              placeholder="Search Movie Title.."
              value={selectMovie}
              onChange={handleSearch}
              className="px-4 py-1 w-full bg-transparent border-b-2 border-white font-lato font-light outline-none"
            />
            {infoMovie?.length! > 0 && (
              <ul
                id="infomovie_list"
                className="backdrop-opacity-10 backdrop-invert bg-black/80 border-[1px] absolute z-10 w-full border-transparent"
              >
                {infoMovie?.map((movie) => {
                  return (
                    <li
                      key={movie.id}
                      className="min-h-0 w-full border-solid px-6 py-2 break-words cursor-pointer font-lato font-light text-lg hover:bg-green-400"
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
        </section>
        {/* INFO MOVIE */}
        <section className="pt-8">
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
              <section className="p-7 flex flex-col space-y-4">
                <h1 className="uppercase font-bold text-4xl font-lato">
                  {movies?.title}
                </h1>
                <span className="text-xl text-green-400 font-light font-oswald">
                  {movies?.tagline}
                </span>
                <p className="font-lato text-base font-light">
                  {movies?.overview}
                </p>
                <section>
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
                </section>
                <section className="grid grid-cols-2 font-oswald font-light">
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
                </section>
              </section>
            </article>
          )}
        </section>
      </div>
    </main>
  );
}
