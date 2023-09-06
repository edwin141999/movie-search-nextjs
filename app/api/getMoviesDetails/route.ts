import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN_API}`,
      },
    }
  );
  const data = await res.json();
  
  return NextResponse.json(data);
}