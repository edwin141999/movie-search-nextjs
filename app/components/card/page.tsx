import { useAppSelector } from "@/app/redux/hooks";
import Image from "next/image";

export default function Card() {
  const movies = useAppSelector((state) => state.movieSlice);
  const loading = useAppSelector((state) => state.loadingSlice);

  return (
    <section className="pt-8">
      {loading ? (
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
              <div className="flex flex-row">
                {movies.genres.map((genre) => {
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
                {movies.production_companies.map((company) => {
                  return (
                    <span key={company.id} className="font-oswald font-light">
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
                  {movies.release_date}
                </span>
              </div>
              <div>
                <p>Running Time:</p>
                <span className="text-green-400 text-2xl">
                  {movies.runtime} mins
                </span>
              </div>
              <div>
                <p>Box Office:</p>
                <span className="text-green-400 text-2xl">
                  $
                  {movies.revenue
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
              <div>
                <p>Vote Average:</p>
                <span className="text-green-400 text-2xl">
                  {movies.vote_average} / 10
                </span>
              </div>
            </section>
          </section>
        </article>
      )}
    </section>
  );
}
