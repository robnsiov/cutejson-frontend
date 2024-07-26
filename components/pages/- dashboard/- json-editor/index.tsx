import Editor from "./editor";

const JsonEditor = () => {
  return (
    <>
      <div className="w-full flex justify-start items-start">
        <Editor />
        <div className="w-[300px] flex justify-center items-center flex-col"></div>
      </div>
    </>
  );
};
export default JsonEditor;
