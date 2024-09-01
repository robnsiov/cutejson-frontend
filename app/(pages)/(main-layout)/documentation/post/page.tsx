import PostDocumentation from "@/components/pages/- documentation/post";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POST Method Documentation - Cute JSON",
  description:
    "Discover how to use the POST method with Cute JSON. Learn how to send data to your APIs and manage resources.",
  keywords: "POST method, Cute JSON, API documentation, send data, API methods",
};

const Page = () => {
  return (
    <>
      <PostDocumentation />
    </>
  );
};
export default Page;
