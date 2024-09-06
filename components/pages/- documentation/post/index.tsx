import Markdown from "@/components/shared/markdown";
import fs from "fs";

const PostDocumentation = () => {
  const md = fs.readFileSync("./documentations/post.md", "utf8");

  return (
    <>
      <Markdown md={md} />
    </>
  );
};
export default PostDocumentation;
