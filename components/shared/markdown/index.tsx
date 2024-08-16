import MD from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownProps from "./types";

const Markdown = ({ md }: MarkdownProps) => {
  return (
    <>
      <div className="markdown mb-5">
        <MD className={"markdown"} remarkPlugins={[remarkGfm]}>
          {md}
        </MD>
      </div>
    </>
  );
};
export default Markdown;
