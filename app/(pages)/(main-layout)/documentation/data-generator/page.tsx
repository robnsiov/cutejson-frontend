import DataGeneratorDocumentation from "@/components/pages/- documentation/data-generator";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Generator - Cute JSON",
  description:
    "Easily generate fake data with Cute JSON's data generator. Create realistic JSON data for testing and development with just a few clicks.",
  keywords:
    "data generator, fake data creation, JSON data generator, Cute JSON, API testing, JSON development",
};

const Page = () => {
  return (
    <>
      <DataGeneratorDocumentation />
    </>
  );
};
export default Page;
