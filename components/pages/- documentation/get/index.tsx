import Markdown from "@/components/shared/markdown";
import fs from "fs";

const GetDocumentation = () => {
  const md = fs.readFileSync("./documentations/get.md", "utf8");

  return (
    <>
      <Markdown md={md} />
    </>
  );
};
export default GetDocumentation;
