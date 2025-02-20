import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import cls from "classnames";
import { Loader2 } from "lucide-react";
import EditorElementsProps from "./types";

const Editor = (props: EditorProps & EditorElementsProps) => {
  return (
    <>
      <div
        className={cls(
          `absolute inset-0 bg-white z-50 rounded-lg flex justify-center items-center
              transition-all duration-200`,
          props.loading ? "opacity-100 visible" : "invisible opacity-0"
        )}
      >
        <Loader2 className="size-5 animate-spin" />
      </div>
      <MonacoEditor {...props} />
    </>
  );
};

export default Editor;
