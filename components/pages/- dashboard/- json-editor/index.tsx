"use client";
import { useElementSize } from "@mantine/hooks";
import CuteJsonToken from "./cute-json-token";
import Editor from "./editor";

const JsonEditor = () => {
  const { ref, width } = useElementSize();

  return (
    <>
      <div
        className="min-w-full flex justify-start items-start overflow-hidden
        md:flex-row flex-col"
        ref={ref}
      >
        <Editor parentWidth={width} />
        <div
          className="flex justify-center items-center flex-col md:ml-4 md:w-auto w-full
        md:mt-0 mt-8 pb-1"
        >
          <CuteJsonToken />
        </div>
      </div>
    </>
  );
};
export default JsonEditor;
