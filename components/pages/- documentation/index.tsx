import Markdown from "@/components/shared/markdown";
import fs from "fs";

const Documentation = () => {
  const md = fs.readFileSync("./documentations/doc.md", "utf8");

  return (
    <>
      <Markdown md={md} />
    </>
  );
};
export default Documentation;
