"use client";
import MonacoEditor from "@monaco-editor/react";
import useMonacoEditor from "./use";
import PrimaryButton from "@/components/ui/primary-button";
import { Loader2 } from "lucide-react";
import cls from "classnames";
import EditorElement from "@/components/shared/editor";
// import { useElementSize } from "@mantine/hooks";
import { useViewportSize } from "@mantine/hooks";
import EditorProps from "./types";
import { useRecoilState } from "recoil";
import menuIsOpenAtom from "@/recoil/menu-is-open-atom";
import { CONTAINER_MAX_WIDTH } from "@/constants/sizes";

const Editor = ({ parentWidth }: EditorProps) => {
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

  const { width: viewportWidth } = useViewportSize();
  const vpWidth =
    viewportWidth > CONTAINER_MAX_WIDTH ? CONTAINER_MAX_WIDTH : viewportWidth;
  const [mesuIsOpen] = useRecoilState(menuIsOpenAtom);

  return (
    <>
      <div className="w-full flex justify-start items-start flex-col">
        <div
          style={{
            width:
              vpWidth < 1024
                ? vpWidth - 50 + "px"
                : vpWidth - 320 + (!mesuIsOpen ? 170 : 0) - 330 + "px",
          }}
          className=" w-full md:h-[calc(100vh-150px)] h-[50vh] border border-slate-200 rounded-lg p-4 pl-0 relative
          "
        >
          <EditorElement
            loading={editorLoading}
            onChange={onChange}
            onMount={() => setEditorHasMounted(true)}
            className="h-full w-full"
            onValidate={(validate) => setValidate(validate)}
            defaultLanguage="json"
            value={json}
          />
        </div>
        <div className="w-full flex justify-start items-center mt-3">
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
