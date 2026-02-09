"use client";
import React, { useEffect, useState } from "react";
import { getContentInZip } from "src/entities/blog/api";
import { ZipFileResponse as apiResponse } from "src/entities/blog/types";
import { ZipFileResponse } from "src/widgets/blog/list/types";
import toast from "react-hot-toast";

interface Props {
  item: ZipFileResponse;
  isOpen: boolean;
}
export const FileItem = ({ item, isOpen }: Props) => {
  const [content, setContent] = useState<apiResponse>();
  useEffect(() => {
    if (isOpen) {
      getContentInZip(item.name).then((res) => {
        setContent(res?.data);
      });
    }
  }, []);

  return (
    <div className={"border border-blue-600 p-4"}>
      <div className={"border border-blue-200 p-4"}>{item.name}</div>
      {content && (
        <div>
          <div className={"p-4"}>상세 내용</div>
          <div className={"p-4"}>
            <button className={"border p-4"} onClick={() => copyText(content.title)}>
              {content.title}
            </button>
            <pre className={"border p-4"} onClick={() => copyText(content.tags.join(","))}>
              {content.tags.join(",")}
            </pre>
            <pre className={"border p-4"} onClick={() => copyText(content.content)}>
              {content.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast("복사되었습니다.");
  } catch (e) {
    toast("복사에 실패했습니다.");
  }
};
