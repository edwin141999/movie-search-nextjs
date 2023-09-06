"use client";
import Image from "next/image";
import { getSearchMovie } from "../../api/tmdb_api";
import { MOVIES, MOVIESEARCH } from "../../interface/movies";
import { setInfoMovie } from "../../redux/features/infoMovieSlice";
import { setMovie } from "../../redux/features/movieSlice";
import { setSearchMovie } from "../../redux/features/searchMovieSlice";
import { setSelectedMovie } from "../../redux/features/selectedMovieSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Navbar() {
  const selectedMovie = useAppSelector(
    (state) => state.selectedMovieSlice.name
  );
  const infoMovie = useAppSelector((state) => state.infoMovieSlice);
  const searchMovie = useAppSelector((state) => state.searchMovieSlice);

  const dispatch = useAppDispatch();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedMovie(e.target.value));

    if (e.target.value === "") {
      dispatch(setInfoMovie([]));
      return;
    }
    const movie: MOVIESEARCH = await getSearchMovie(e.target.value);

    dispatch(setSearchMovie(movie.results.slice(0, 5)));
    dispatch(
      setInfoMovie(
        searchMovie?.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
          };
        })
      )
    );
  };

  const getMovies = async (idMovie: number) => {
    fetch(`/api/getMoviesDetails?movieId=${idMovie}`)
      .then((res) => res.json())
      .then((data: MOVIES) => dispatch(setMovie(data)));
  };

  return (
    <section className="flex justify-between items-center">
      <Image src={"/logo.png"} alt="logo picture" width={130} height={130} />
      <div className="relative w-7/12">
        <input
          type="text"
          placeholder="Search Movie Title.."
          value={selectedMovie}
          onChange={handleSearch}
          className="px-4 py-1 w-full bg-transparent border-b-2 border-white font-lato font-light outline-none"
        />
        {infoMovie?.length > 0 && (
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
                    dispatch(setSelectedMovie(movie.title));
                    getMovies(movie.id);
                    dispatch(setInfoMovie([]));
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
  );
}
