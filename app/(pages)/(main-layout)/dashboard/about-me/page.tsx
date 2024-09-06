import AboutMe from "@/components/pages/- dashboard/- about-me";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me (Robnsiov) - Cute JSON",
  description:
    "Learn more about Cute JSON, our mission, and the team behind our innovative API generation and JSON editing tools.",
  keywords: "About Me, Cute JSON, company information, team, mission",
};

const Page = () => {
  return (
    <>
      <AboutMe />
    </>
  );
};
export default Page;
