"use client";
import { Loader2 } from "lucide-react";
import JsonEditorProviderProps from "./types";
import useJsonEditorProvider from "./use";

const JsonEditorProvider = ({ children }: JsonEditorProviderProps) => {
  const { jsonToken } = useJsonEditorProvider();
  return (
    <>
      {jsonToken.status === "loading" && (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
      {jsonToken.status === "finish" && children}
    </>
  );
};
export default JsonEditorProvider;
