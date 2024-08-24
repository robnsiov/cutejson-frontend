import Markdown from "@/components/shared/markdown";
import fs from "fs";

const DeleteDocumentation = () => {
  const md = fs.readFileSync("./documentations/delete.md", "utf8");

  return (
    <>
      <Markdown md={md} />
    </>
  );
};
export default DeleteDocumentation;
