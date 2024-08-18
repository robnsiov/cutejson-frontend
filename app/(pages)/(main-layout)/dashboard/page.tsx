import JsonEditor from "@/components/pages/- dashboard/- json-editor";
import JsonEditorProvider from "@/components/providers/json-editor";

const Page = () => {
  return (
    <>
      <JsonEditorProvider>
        <JsonEditor />
      </JsonEditorProvider>
    </>
  );
};

export default Page;
