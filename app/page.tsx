import Home from "@/components/pages/- home";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cute JSON - Automated API Generation & JSON Editing",
  description:
    "Cute JSON offers automated API generation from JSON keys, fake data creation, and an integrated online JSON editor. Create, test, and manage your APIs effortlessly.",
  keywords:
    "Cute JSON, API generation, JSON editor, fake data generation, online JSON editor, API testing",
};
const Page = () => {
  return (
    <>
      <Home />
    </>
  );
};
export default Page;
