import { useToast } from "@/components/ui/use-toast";
import apis from "@/constants/apis";
import { TOAST_FAIL_TITLE } from "@/constants/toast";
import jsonDBAtom from "@/recoil/json-db-atom";
import Axios from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useRecoilState } from "recoil";

const date = new Date();
const useMonacoEditor = () => {
  const { toast } = useToast();
  const [json, setJson] = useState("");
  const [validate, setValidate] = useState<editor.IMarker[]>([]);
  const [editorHasMounted, setEditorHasMounted] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [, setGlobalJsonDB] = useRecoilState(jsonDBAtom);

  const jsonDBQuery = useQuery({
    queryKey: ["json-db"],
    queryFn: () => Axios({ url: apis.getJsonDB }),
    enabled: true,
  });

  const {
    seconds,
    isRunning: timerIsRunning,
    restart,
  } = useTimer({
    expiryTimestamp: date,
    autoStart: false,
  });

  useEffect(() => {
    const jsonData = jsonDBQuery.data?.data;
    if (!jsonData) return;
    setJson(JSON.stringify(jsonData, null, 2));
    setGlobalJsonDB({ db: JSON.stringify(jsonData), status: "finish" });
  }, [jsonDBQuery.data]);

  useEffect(() => {
    if (jsonDBQuery.isFetched && editorHasMounted) setEditorLoading(false);
  }, [jsonDBQuery, editorHasMounted]);

  const editJsonDBMutation = useMutation({
    mutationFn: (data: Object) =>
      Axios({ url: apis.editJsonDB, method: "PUT", data }),
    onSuccess() {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 10);
      restart(time);
      setGlobalJsonDB({ db: json, status: "finish" });
    },
    onError() {
      setGlobalJsonDB({ db: "{}", status: "error" });
    },
  });

  const saveJson = (timerIsRunning: boolean) => {
    if (validate.length !== 0) {
      const firstErrorMessage = validate[0].message;
      toast({ title: TOAST_FAIL_TITLE, description: firstErrorMessage });
      return;
    }
    if (timerIsRunning) return;
    if (editorLoading) return;
    editJsonDBMutation.mutate(json);
  };

  useEffect(() => {
    const ctrlPlusSpreventaion = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveJson(timerIsRunning);
      }
    };

    window.addEventListener("keydown", ctrlPlusSpreventaion);
    return () => window.removeEventListener("keydown", ctrlPlusSpreventaion);
  }, [json, validate, timerIsRunning]);

  const onChange = (editorOutput: string | undefined) => {
    if (!editorOutput) return;
    setJson(editorOutput);
  };

  return {
    onChange,
    setValidate,
    isPendingSave: editJsonDBMutation.isPending,
    json,
    setEditorHasMounted,
    editorLoading,
    initJsonDBFetched: jsonDBQuery.isFetched,
    seconds,
    timerIsRunning,
    saveJson,
  };
};
export default useMonacoEditor;
