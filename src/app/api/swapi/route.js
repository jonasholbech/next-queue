import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://swapi.dev/api/people/1/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
