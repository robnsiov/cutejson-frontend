import ContactUs from "@/components/pages/- dashboard/- contact-me";
import ContactUsTitle from "@/components/pages/- dashboard/- contact-me/title";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me - Cute JSON",
  description:
    "Get in touch with me for support, inquiries, or feedback. I here to help you with your API and JSON needs.",
  keywords: "Contact Me, Cute JSON, support, inquiries, feedback",
};

const Page = () => {
  return (
    <>
      <ContactUsTitle />
      <ContactUs />
    </>
  );
};
export default Page;
