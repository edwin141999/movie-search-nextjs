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
