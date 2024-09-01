import JsonEditor from "@/components/pages/- dashboard/- json-editor";
import JsonEditorProvider from "@/components/providers/json-editor";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Editor - Cute JSON",
  description:
    "Use the integrated JSON editor in Cute JSON to create, edit, and manage your JSON files in real-time. Test your APIs and view responses instantly.",
  keywords:
    "JSON editor, Cute JSON, online JSON editor, real-time editing, API testing",
};

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
