"use client";
import MonacoEditor from "@monaco-editor/react";
import useMonacoEditor from "./use";
import PrimaryButton from "@/components/ui/primary-button";
import { Loader2 } from "lucide-react";
import cls from "classnames";
import EditorElement from "@/components/shared/editor";

const Editor = () => {
  const {
    onChange,
    setValidate,
    json,
    setEditorHasMounted,
    editorLoading,
    isPendingSave,
    seconds,
    timerIsRunning,
    saveJson,
  } = useMonacoEditor();
  return (
    <>
      <div className="w-[calc(100%-300px)] flex justify-center items-center flex-col">
        <div className="w-full h-[calc(100vh-150px)] border border-slate-200 rounded-lg p-4 pl-0 relative">
          <EditorElement
            loading={editorLoading}
            onChange={onChange}
            onMount={() => setEditorHasMounted(true)}
            className="h-full"
            onValidate={(validate) => setValidate(validate)}
            defaultLanguage="json"
            value={json}
          />
        </div>
        <div className="w-full flex justify-between items-center mt-3">
          <span>Press ctrl+s to save </span>

          <PrimaryButton
            className={cls(
              `transition-all duration-300`,
              timerIsRunning ? "min-w-[60px]" : "min-w-[130px]"
            )}
            onClick={() => saveJson(timerIsRunning)}
            loading={isPendingSave}
            disabled={timerIsRunning}
          >
            {timerIsRunning && (
              <>
                {seconds === 0 && <span>...</span>}{" "}
                {seconds !== 0 && (
                  <span> {`${seconds}`.padStart(2, "0")} s </span>
                )}{" "}
              </>
            )}
            {!timerIsRunning && "Save changes"}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};
export default Editor;
