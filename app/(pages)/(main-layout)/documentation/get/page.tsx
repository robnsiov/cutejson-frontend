import GetDocumentation from "@/components/pages/- documentation/get";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GET Method Documentation - Cute JSON",
  description:
    "Explore the documentation for the GET method in Cute JSON. Learn how to retrieve data from your APIs effectively.",
  keywords:
    "GET method, Cute JSON, API documentation, retrieve data, API methods",
};

const Page = () => {
  return (
    <>
      <GetDocumentation />
    </>
  );
};
export default Page;
