import Markdown from "@/components/shared/markdown";
import fs from "fs";
import Likes from "./likes";

const AboutMe = () => {
  const md = fs.readFileSync("./documentations/about-me.md", "utf8");

  return (
    <>
      <Markdown md={md} />
      <Likes />
    </>
  );
};
export default AboutMe;
