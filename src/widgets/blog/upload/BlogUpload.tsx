"use client";

import { useState } from "react";
import JSZip from "jszip";
import { cn } from "src/shared/utils/cn";
import { isEmpty } from "src/shared/utils/validate";
import { uploadBlogZipFile } from "src/entities/blog/api";
import { showAlert } from "src/shared/utils/alert";

export const BlogUpload = () => {
  const [files, setFiles] = useState<File[]>();

  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setFiles(fileArray);
    }
  };

  const handleUpload = async () => {
    if (files) {
      uploadBlogZipFile(files);
    } else {
      showAlert("선택된 파일이 없습니다.");
    }
    // if (!files) return;
    //
    // setStatus("압축 해제 중...");
    // const formData = new FormData();
    //
    // for (const zipFile of Array.from(files)) {
    //   const zip = new JSZip();
    //   const content = await zip.loadAsync(zipFile);
    //
    //   // 압축 파일 내부 탐색
    //   for (const [relativePath, fileData] of Object.entries(content.files)) {
    //     if (fileData.dir) continue;
    //
    //     // 텍스트 및 JSON 파일 필터링 (원하는 조건으로 수정 가능)
    //     if (relativePath.endsWith(".json") || relativePath.endsWith(".txt")) {
    //       const blob = await fileData.async("blob");
    //       // 서버에서 구분할 수 있도록 원본 zip 이름과 경로를 조합하여 추가
    //       formData.append("files", blob, `${zipFile.name}/${relativePath}`);
    //     }
    //   }
    // }
    //
    // // 서버로 전송
    // try {
    //   setStatus("서버 및 S3 업로드 중...");
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //
    //   if (response.ok) {
    //     setStatus("모든 작업 완료!");
    //   } else {
    //     setStatus("업로드 실패");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setStatus("에러 발생");
    // }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ZIP 파일 업로드 (Text/JSON 추출)</h2>
      <div className={"border border-blue-200 rounded-2xl p-10"}>
        <div className={"flex justify-between items-center"}>
          <div className={"rounded-2xl p-10"}>
            <input
              className={"p-6 border border-blue-200 rounded-2xl"}
              type="file"
              multiple
              accept=".zip"
              onChange={onChangeUpload}
            />
          </div>
          <button
            onClick={handleUpload}
            className={cn("cursor-pointer bg-gray-500 p-4 rounded-2xl w-40 text-white", {
              "bg-blue-300 text-gray-900": !isEmpty(files),
            })}
          >
            upload
          </button>
        </div>
        <div className={"py-4 flex gap-x-10 gap-y-3 flex-wrap"}>
          {files?.map((item) => (
            <p key={item.name}>{item.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
