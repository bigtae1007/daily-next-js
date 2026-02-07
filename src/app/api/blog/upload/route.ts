// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    const fileNames: string[] = [];
    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name; // 클라이언트에서 보낸 'zip이름/파일명'
      fileNames.push(fileName);
      console.log(file, "filefile");
      // 1. S3 업로드
      // await s3.send(
      //   new PutObjectCommand({
      //     Bucket: process.env.AWS_S3_BUCKET,
      //     Key: `uploads/${fileName}`,
      //     Body: buffer,
      //     ContentType: file.type,
      //   }),
      // );

      // 2. 서버/DB에 특정 값 등록 로직 (예시)
      // await db.record.create({ data: { name: fileName, url: ... } });
      console.log(`등록 완료: ${fileName}`);

      return fileName;
    });

    await Promise.all(uploadPromises);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
