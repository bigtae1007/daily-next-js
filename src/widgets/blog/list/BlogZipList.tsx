import React from "react";
import { ZipFileResponse } from "src/widgets/blog/list/types";
import { FileItem } from "src/features/blog/list/FileItem";

interface Props {
  data: ZipFileResponse[];
}
export const BlogZipList = ({ data }: Props) => {
  return (
    <div className={"p-4"}>
      {data.map((item, index) => (
        <FileItem key={item.id.toString()} item={item} isOpen={index === 0} />
      ))}
    </div>
  );
};
