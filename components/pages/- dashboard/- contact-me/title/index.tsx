import Markdown from "@/components/shared/markdown";
import fs from "fs";

const ContactUsTitle = () => {
  const md = fs.readFileSync("./documentations/contact-me.md", "utf8");
  return (
    <>
      <Markdown md={md} />
    </>
  );
};

export default ContactUsTitle;
