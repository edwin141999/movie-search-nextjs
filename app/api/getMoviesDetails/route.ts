import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_KEY_API}?language=en-US`,
    {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
      },
    }
  );
  const data = await res.json();
  
  return NextResponse.json(data);
}