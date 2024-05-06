import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // const { cursor } = request.body;
  // const nextCursor = cursor || 'undefined';
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("cursor");
  console.log("Query:", query);
  const token = "8feb1cc709614c5dafba2005b0f6e02f";
  const headers = {
    "content-type": "application/json",

    Authorization: `Bearer ${token}`,
  };
  // const url = `https://civitai.com/api/trpc/image.getInfinite?input={"json":{"include":["cosmetics"],"period":"Week","sort":"Most Reactions","types":["image"],"browsingLevel":1,"cursor":"${query}"}}`;
  const url = `https://civitai.com/api/v1/images`;
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));
  // console.log("Response:", res);
  // console.log("Data:", res.error.json.data);
  // const res = await fetch('https://civitai.com/api/trpc/image.getInfinite?input={"json"
  return NextResponse.json({
    res,
  });
}
