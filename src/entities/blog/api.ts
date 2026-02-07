import { selfApiPostFormData } from "src/shared/api/self";
import { API } from "src/shared/api/base";

const ENDPOINT = {
  UPLOAD_BLOG_ZIP: "api/blog/upload",
  ENROLL_UPLOAD_FILE_NAME: "blog/upload",
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
