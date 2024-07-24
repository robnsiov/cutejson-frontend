import apis from "@/constants/apis";
import Axios from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import jsonTokenAtom from "@/recoil/json-token-atom";
import { JsonTokenMutateProps } from "./types";

const useRootProvider = () => {
  const [jsonToken, setJsonToken] = useRecoilState(jsonTokenAtom);

  const JsonTokenMutate = useMutation({
    mutationFn: () => Axios.post<JsonTokenMutateProps>(apis.createJsonToken),
    onSuccess(res) {
      localStorage.setItem("cute-json-token", res.data.db);
      setJsonToken({ token: res.data.db, status: "finish" });
    },
    onMutate() {
      setJsonToken({ ...jsonToken, status: "loading" });
    },
    onError() {
      setJsonToken({ ...jsonToken, status: "error" });
    },
  });

  useEffect(() => {
    const cuteJsonToken = localStorage.getItem("cute-json-token");
    if (!cuteJsonToken) JsonTokenMutate.mutate();
    else setJsonToken({ token: cuteJsonToken, status: "finish" });
  }, []);

  return {};
};
export default useRootProvider;
