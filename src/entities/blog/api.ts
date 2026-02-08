import { selfApi, selfApiPostFormData } from "src/shared/api/self";
import { API } from "src/shared/api/base";
import { UploadResponse, ZipFileResponse } from "src/entities/blog/types";

const ENDPOINT = {
  UPLOAD_BLOG_ZIP: "api/blog/upload",
  ENROLL_UPLOAD_FILE_NAME: "blog/upload",
  UNZIP_S3: "api/blog/upzip",
};

export const uploadBlogZipFile = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return await selfApiPostFormData<UploadResponse>(ENDPOINT.UPLOAD_BLOG_ZIP, formData);
};

export const insertFileName = async (data: { fileName: string }[]) => {
  const names = data.map((item) => item.fileName);
  return await API.post(ENDPOINT.ENROLL_UPLOAD_FILE_NAME, { names });
};

export const getContentInZip = async (name: string) => {
  return await selfApi.get<ZipFileResponse>(`${ENDPOINT.UNZIP_S3}?name=${name}`);
};
