import Documentation from "@/components/pages/- documentation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started with Cute JSON",
  description:
    "Begin using Cute JSON with our comprehensive guide. Learn how to generate APIs, create fake data, and use the online JSON editor.",
  keywords:
    "Get Started, Cute JSON guide, API generation, JSON editor tutorial, fake data creation",
};

const Page = () => {
  return (
    <>
      <Documentation />
    </>
  );
};
export default Page;
