"use client";
import React, { useEffect, useState } from "react";
import { getContentInZip, updateDoneFile } from "src/entities/blog/api";
import { ZipFileResponse as apiResponse } from "src/entities/blog/types";
import { ZipFileResponse } from "src/widgets/blog/list/types";
import toast from "react-hot-toast";

interface Props {
  item: ZipFileResponse;
  isOpen: boolean;
}
export const FileItem = ({ item, isOpen }: Props) => {
  const [content, setContent] = useState<apiResponse>();
  const [isDone, setIsDone] = useState(false);

  const handleClickDone = async () => {
    const isDo = confirm("완료입니까?");
    if (!isDo) return;
    try {
      const res = await updateDoneFile(item.id);
      const data = res.data;
      if (data.code > 0) {
        toast.success("성공");
        setIsDone(true);
      } else {
        throw new Error(`code가 0보다 작아요. code:::${data.code}`);
      }
    } catch (e) {
      toast(`완료 실패!`);
      console.info(JSON.stringify(e));
    }
  };

  useEffect(() => {
    if (isOpen) {
      getContentInZip(item.name).then((res) => {
        setContent(res?.data);
      });
    }
  }, [isOpen, item.name]);

  return (
    <div hidden={isDone} className={"border border-blue-600 p-4"}>
      <div className={"border border-blue-200 p-4"}>{item.name}</div>
      {content && (
        <div>
          <div className={"p-4"}>
            상세 내용{" "}
            <button
              onClick={handleClickDone}
              className={"bg-amber-300 text-gray-800 w-50 py-4 ml-5 rounded-2xl"}
            >
              완료하기
            </button>
          </div>
          <div className={"p-4"}>
            <button className={"border p-4 w-full"} onClick={() => copyText(content.title)}>
              {content.title}
            </button>
            <button
              className={"border p-4 w-full mt-4"}
              onClick={() => copyText(content.tags.join(","))}
            >
              {content.tags.join(",")}
            </button>
            <button className={"border p-4 w-full mt-4"} onClick={() => copyText(content.content)}>
              {content.content}
            </button>
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
