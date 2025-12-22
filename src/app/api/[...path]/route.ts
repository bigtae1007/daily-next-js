// src/app/api/_[...path]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const waitparams= await params;
  console.log(waitparams.path ,'waitparams.path ')
  return NextResponse.json({ path: waitparams.path });
}