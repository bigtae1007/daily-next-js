// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { insertFileName } from "src/entities/blog/api";

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

    // 파일 없으면 400 오류
    if (!files.length) {
      return NextResponse.json({ message: "업로드할 파일이 없습니다." }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name; // 클라이언트에서 보낸 'zip이름/파일명'
      // 1. S3 업로드
      await s3.send(
        new PutObjectCommand({
          Bucket: "blog-zip-file",
          Key: `blog/add/${fileName}`,
          Body: buffer,
          ContentType: file.type,
        }),
      );

      return fileName;
    });

    const results = await Promise.allSettled(uploadPromises);

    const successFiles: { fileName: string }[] = [];
    const failedFiles: { fileName: string; reason: string }[] = [];

    results.forEach((result, index) => {
      const fileName = files[index].name;

      if (result.status === "fulfilled") {
        successFiles.push({ fileName });
      } else {
        failedFiles.push({
          fileName,
          reason: result.reason instanceof Error ? result.reason.message : String(result.reason),
        });
      }
    });

    insertFileName(successFiles);

    return NextResponse.json({ message: "Success", successFiles, failedFiles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
