import Link from "next/link";
import React from "react";
import MD from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownProps from "./types";

function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
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
          a: (c: any) => <Link {...c}>{c.children}</Link>,
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
