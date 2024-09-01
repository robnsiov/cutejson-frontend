import PutDocumentation from "@/components/pages/- documentation/put";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PUT Method Documentation - Cute JSON",
  description:
    "Read the documentation for the PUT method in Cute JSON. Understand how to update data in your APIs efficiently.",
  keywords:
    "PUT method, Cute JSON, API documentation, update data, API methods",
};

const Page = () => {
  return (
    <>
      <PutDocumentation />
    </>
  );
};
export default Page;
