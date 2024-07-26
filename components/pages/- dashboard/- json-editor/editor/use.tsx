import { useEffect, useState } from "react";
import { editor } from "monaco-editor";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_FAIL_TITLE } from "@/constants/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "@/utils/axios";
import apis from "@/constants/apis";
import { useTimer } from "react-timer-hook";

const date = new Date();
const useMonacoEditor = () => {
  const { toast } = useToast();
  const [json, setJson] = useState("");
  const [validate, setValidate] = useState<editor.IMarker[]>([]);
  const [editorHasMounted, setEditorHasMounted] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);

  const jsonDBQuery = useQuery({
    queryKey: ["json-db"],
    queryFn: () => Axios({ url: apis.getJsonDB }),
    enabled: false,
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
  }, [jsonDBQuery.data]);

  useEffect(() => {
    if (jsonDBQuery.isFetched && editorHasMounted) setEditorLoading(false);
  }, [jsonDBQuery, editorHasMounted]);

  useEffect(() => {
    setTimeout(() => {
      jsonDBQuery.refetch();
    }, 5000);
  }, []);

  const editJsonDBMutattion = useMutation({
    mutationFn: (data: Object) =>
      Axios({ url: apis.editJsonDB, method: "PUT", data }),
    onSuccess() {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 10);
      restart(time);
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
    editJsonDBMutattion.mutate(json);
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

  // console.log(json);

  const onChange = (editorOutput: string | undefined) => {
    if (!editorOutput) return;
    setJson(editorOutput);
  };

  return {
    onChange,
    setValidate,
    isPendingSave: editJsonDBMutattion.isPending,
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
