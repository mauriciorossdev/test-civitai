import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("cursor");

  const token = process.env.CIVITAI_API_KEY;
  const url =
    query && query !== "undefined"
      ? query
      : `https://civitai.com/api/v1/images`;
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));
  return NextResponse.json({
    res,
  });
}
