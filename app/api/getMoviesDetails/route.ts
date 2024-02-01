import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=1f37a5ca5e7f2a558a3b79883499caad?language=en-US`,
    {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        accept: "application/json",
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjM3YTVjYTVlN2YyYTU1OGEzYjc5ODgzNDk5Y2FhZCIsInN1YiI6IjY0ZGZiNTIxYWFlYzcxMDNmYmVhZDdlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EVXj9pP7vb91Ac5tAVJMi_-Evy0Jh1Cmg4iH_EbiuWA`,
      },
    }
  );
  const data = await res.json();
  
  return NextResponse.json(data);
}