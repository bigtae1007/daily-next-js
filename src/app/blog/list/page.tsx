import React from "react";
import { BlogZipList } from "src/widgets/blog/list/BlogZipList";

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/list/zip`, {
    cache: "no-cache", // SSR
  });

  const response = await res.json();
  return <BlogZipList data={response?.data || []} />;
};

export default Page;
