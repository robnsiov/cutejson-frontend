import Markdown from "@/components/shared/markdown";
import fs from "fs";

const PutDocumentation = () => {
  const md = fs.readFileSync("./documentations/put.md", "utf8");

  return (
    <>
      <Markdown md={md} />
    </>
  );
};
export default PutDocumentation;
