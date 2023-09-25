import { NextResponse } from "next/server";
import { getSWChar } from "@/utils/requests";
export async function GET() {
  const data = await getSWChar();

  return NextResponse.json(data);
}
