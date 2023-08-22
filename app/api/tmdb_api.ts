const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TOKEN_API}`,
  },
};

export const getMovieDetails = async (movieId: number) => {
  const response: Response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return await response.json();
};

export const getSearchMovie = async (query: string) => {
  const response: Response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
    options
  );
  return await response.json();
}