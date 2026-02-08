import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const AdmZip = require("adm-zip") as any;

export async function GET(req: NextRequest) {
  try {
    // 1. query param
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ message: "name 파라미터가 필요합니다." }, { status: 400 });
    }

    // 2. ZIP URL 구성
    const zipUrl = `${process.env.AWS_S3_ZIP_URL}/${name}`;

    // 3. ZIP 다운로드
    const zipRes = await fetch(zipUrl);
    if (!zipRes.ok) {
      return NextResponse.json({ message: "ZIP 파일을 불러올 수 없습니다." }, { status: 404 });
    }

    const buffer = Buffer.from(await zipRes.arrayBuffer());

    // 4. ZIP 해제
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    let content: string | null = null;
    let title: string | null = null;
    let tags: string[] | null = null;

    for (const entry of entries) {
      if (entry.isDirectory) continue;

      // text 파일
      if (entry.entryName.endsWith(".html.txt")) {
        content = entry.getData().toString("utf-8");
      }

      // json 파일
      if (entry.entryName.endsWith(".json")) {
        const json = JSON.parse(entry.getData().toString("utf-8"));
        title = json.title;
        tags = json.tags;
      }
    }

    // 5. 검증
    if (!content || !title || !tags) {
      return NextResponse.json(
        { message: "ZIP 내부 파일 형식이 올바르지 않습니다." },
        { status: 422 },
      );
    }

    // 6. 응답
    return NextResponse.json({
      title,
      tags,
      content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
