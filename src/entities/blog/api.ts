import { selfApiPostFormData } from "src/shared/api/self";

const ENDPOINT = {
  UPLOAD_BLOG_ZIP: "api/blog/upload",
};

export const uploadBlogZipFile = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  await selfApiPostFormData(ENDPOINT.UPLOAD_BLOG_ZIP, formData);
};
