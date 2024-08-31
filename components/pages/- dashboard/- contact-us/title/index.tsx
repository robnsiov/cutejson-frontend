import Markdown from "@/components/shared/markdown";
import fs from "fs";

const ContactUsTitle = () => {
  const md = fs.readFileSync("./documentations/contact-us.md", "utf8");
  return (
    <>
      <Markdown md={md} />
    </>
  );
};

export default ContactUsTitle;
