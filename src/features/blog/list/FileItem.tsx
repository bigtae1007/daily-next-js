"use client";
import React, { useEffect, useState } from "react";
import { getContentInZip } from "src/entities/blog/api";
import { ZipFileResponse as apiResponse } from "src/entities/blog/types";
import { ZipFileResponse } from "src/widgets/blog/list/types";

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
    <div className={'border border-blue-600 p-4'}>
      <div className={'border border-blue-200 p-4'}>{item.name}</div>
      {content && (
        <div>
          <div className={'p-4'}>상세 내용</div>
          <div className={'p-4'}>
            <div className={"border p-4 "}>{content.title}</div>
            <pre className={"border p-4"}>{content.tags.join(',')}</pre>
            <pre className={"border p-4"}>{content.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
