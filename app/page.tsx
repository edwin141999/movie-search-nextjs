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
      className="bg-cover bg-center "
      style={{
        backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movies?.backdrop_path}`})`,
      }}
    >
      <div className="backdrop-opacity-10 backdrop-invert bg-black/40">
        <div className="w-full flex flex-col text-black">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a movie"
              value={selectMovie}
              onChange={handleSearch}
              className="border border-gray-400 rounded-md p-2"
            />
            {infoMovie?.length! > 0 && (
              <ul
                id="infomovie_list"
                className="bg-white border-[1px] rounded-lg p-4 absolute"
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
        <div>
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <>
              <p>PHOTO</p>
              <Image
                src={
                  `https://image.tmdb.org/t/p/original${movies?.poster_path}` ||
                  "/image-not-found.jpg"
                }
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
                $
                {movies?.revenue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <p>VOTE AVERAGE</p>
              <p>{movies?.vote_average} / 10</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
