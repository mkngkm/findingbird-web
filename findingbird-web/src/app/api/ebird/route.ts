// app/api/ebird/route.ts
import { NextRequest, NextResponse } from "next/server";

const EBIRD_TOKEN = process.env.EBIRD_API_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "위치 정보가 없습니다." }, { status: 400 });
  }

  const response = await fetch(
    `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&sort=species&maxResults=20`,
    {
      headers: {
        "X-eBirdApiToken": EBIRD_TOKEN!,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "eBird 호출 실패" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
