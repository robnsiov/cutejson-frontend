import MD from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownProps from "./types";
import React from "react";

function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  console.log(props);
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");
  var slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement(
    props.node.tagName,
    { id: slug, className: "markdown__heading" },
    props.children
  );
}

const Markdown = ({ md }: MarkdownProps) => {
  return (
    <>
      <MD
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: HeadingRenderer,
          h5: HeadingRenderer,
          h6: HeadingRenderer,
        }}
        className={"markdown mb-5"}
        remarkPlugins={[remarkGfm]}
      >
        {md}
      </MD>
    </>
  );
};
export default Markdown;
