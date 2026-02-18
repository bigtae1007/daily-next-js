"use client";

import { useState } from "react";
import { Select } from "antd";
import { cn } from "src/shared/utils/cn";
import { isEmpty } from "src/shared/utils/validate";
import { uploadBlogZipFile } from "src/entities/blog/api";
import { showAlert } from "src/shared/utils/alert";

export const BlogUpload = () => {
  const [files, setFiles] = useState<File[]>();
  const [categoryId, setCategoryId] = useState<string>();
  const [success, setSuccess] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);
  const [failedReason, setFailedReason] = useState<string[]>([]);

  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setFiles(fileArray);
    }
  };

  const handleUpload = async () => {
    if (!isEmpty(files) && files && categoryId) {
      const res = await uploadBlogZipFile(files, categoryId);
      const successFileName = findFileName(res.successFiles);
      const failedFileName = findFileName(res.failedFiles);
      const failedReason = findReason(res.failedFiles);

      setSuccess(successFileName);
      setFailed(failedFileName);
      setFailedReason(failedReason);
    } else {
      showAlert("선택된 파일이 없습니다.");
    }
  };

  const findFileName = (files: { fileName: string }[]): string[] => {
    return files.map((item) => item.fileName);
  };
  const findReason = (files: { reason?: string }[]): string[] => {
    return files.map((item) => item.reason || "---");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ZIP 파일 업로드 (Text/JSON 추출)</h2>
      <div className={"border border-blue-200 rounded-2xl p-10"}>
        <div className={"py-4 flex gap-x-10 gap-y-3 flex-wrap"}>
          {files?.map((item) => (
            <p key={item.name}>{item.name}</p>
          ))}
        </div>
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
          <div className={"border border-blue-200 rounded-2xl p-4 flex items-center gap-3"}>
            <Select
              allowClear
              placeholder="카테고리 선택"
              className={"w-48"}
              options={[
                { value: "1113274", label: "GIT" },
                { value: "1144848", label: "FE" },
              ]}
              value={categoryId}
              onChange={(value) => {
                setCategoryId(value);
              }}
            />
            <button
              onClick={handleUpload}
              className={cn("cursor-pointer bg-gray-500 p-4 rounded-2xl w-40 text-white", {
                "bg-blue-300 text-gray-900": !isEmpty(files),
              })}
            >
              upload
            </button>
          </div>
        </div>
        <div className={"mb-4"}>
          <div className={"flex gap-4 flex-wrap"}>
            <div className={"text-blue-500 mr-4"}>성공 파일:::</div>
            {success?.map((text) => (
              <span key={text}>{text}</span>
            ))}
          </div>
          <div className={"flex gap-4 flex-wrap"}>
            <div className={"text-red-500 mr-4"}>성공 파일:::</div>
            {failed?.map((text) => (
              <span key={text}>{text}</span>
            ))}
          </div>
        </div>
        <div className={"flex flex-col gap-4"}>
          {failedReason.map((item, index) => (
            <p key={index.toString()}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
