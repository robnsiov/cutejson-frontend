import Markdown from "@/components/shared/markdown";
import fs from "fs";

const DataGeneratorDocumentation = () => {
  const md = fs.readFileSync("./documentations/data-generator.md", "utf8");

  return (
    <>
      <Markdown md={md} />
    </>
  );
};
export default DataGeneratorDocumentation;
