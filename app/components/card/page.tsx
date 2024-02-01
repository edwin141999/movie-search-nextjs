'use client'
import { useAppSelector } from "@/app/redux/hooks";
import Image from "next/image";
import TextGrid from "../textGrid";

export default function Card() {
  const movies = useAppSelector((state) => state.movieSlice);
  const loading = useAppSelector((state) => state.loadingSlice);

  return (
    <section className="pt-8">
      {/* CHANGED FOR LOADING */}
      {!movies ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
      ) : (
        <article className="flex flex-row bg-black/80 backdrop-opacity-10 backdrop-invert">
          <Image
            src={`https://image.tmdb.org/t/p/original${movies.poster_path}`}
            alt="movie photo"
            width={390}
            height={390}
          />
          <section className="p-7 flex flex-col space-y-4">
            <h1 className="uppercase font-bold text-4xl font-lato">
              {movies.title}
            </h1>
            <span className="text-xl text-green-400 font-light font-oswald">
              {movies.tagline}
            </span>
            <p className="font-lato text-base font-light">{movies.overview}</p>
            <section>
              {movies.genres.map((genre, index) => {
                return (
                  <span
                    key={genre.id}
                    className="text-green-400 font-oswald font-light text-2xl"
                  >
                    {index ? ", " : ""}
                    {genre.name}
                  </span>
                );
              })}
              <br />
              {movies.production_companies.map((company, index) => {
                return (
                  <span key={company.id} className="font-oswald font-light">
                    {index ? ", " : ""}
                    {company.name}
                  </span>
                );
              })}
            </section>
            <section className="grid grid-cols-2 gap-4 font-oswald font-light">
              <TextGrid
                subtitle="Original Release:"
                text={movies.release_date}
              />
              <TextGrid
                subtitle="Running Time:"
                text={`${movies.runtime} mins`}
              />
              <TextGrid
                subtitle="Box Office:"
                text={`$${movies.revenue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              />
              <TextGrid
                subtitle="Vote Average:"
                text={`${movies.vote_average} / 10`}
              />
            </section>
          </section>
        </article>
      )}
    </section>
  );
}
