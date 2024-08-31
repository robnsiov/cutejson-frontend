"use client";
import { useElementSize } from "@mantine/hooks";
import CuteJsonToken from "./cute-json-token";
import Editor from "./editor";
import Postman from "./postman";
import FakeDataGenerator from "./fake-data-generator";
import RecoveryDB from "./recovery-db";
import ApisList from "./apis-list";

const JsonEditor = () => {
  const { ref, width } = useElementSize();

  return (
    <>
      <div
        className="min-w-full flex justify-start items-start
        md:flex-row flex-col"
      >
        <div className="w-full flex flex-col justify-center items-center md:sticky top-0 left-0">
          <Editor parentWidth={width} />
        </div>
        <div
          className="flex justify-center items-center flex-col md:ml-4 md:w-auto w-full
        md:mt-0 mt-8 pb-1"
        >
          <CuteJsonToken />
          <Postman />
          <FakeDataGenerator />
          <RecoveryDB />
          <ApisList />
        </div>
      </div>
    </>
  );
};
export default JsonEditor;
