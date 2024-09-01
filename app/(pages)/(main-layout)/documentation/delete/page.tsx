import DeleteDocumentation from "@/components/pages/- documentation/delete";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DELETE Method Documentation - Cute JSON",
  description:
    "Learn about the DELETE method in Cute JSON. Find out how to remove data from your APIs and manage resources.",
  keywords:
    "DELETE method, Cute JSON, API documentation, remove data, API methods",
};

const Page = () => {
  return (
    <>
      <DeleteDocumentation />
    </>
  );
};
export default Page;
