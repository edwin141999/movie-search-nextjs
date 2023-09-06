import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
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
