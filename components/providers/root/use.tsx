import apis from "@/constants/apis";
import Axios from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import jsonTokenAtom from "@/recoil/json-token-atom";
import { JsonTokenMutateProps, UserInfoUseQueryProps } from "./types";
import { useDidUpdate } from "@mantine/hooks";
import userAtom from "@/recoil/user-atom";

const useRootProvider = () => {
  const [jsonToken, setJsonToken] = useRecoilState(jsonTokenAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const {
    data: userInfoRes,
    isError: userInfoError,
    isSuccess: userInfoSuccess,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => Axios<UserInfoUseQueryProps>({ url: apis.userInfo }),
    retry: false,
  });

  useEffect(() => {
    setUser({ status: "loading", data: {} });
  }, []);

  useDidUpdate(() => {
    if (userInfoSuccess)
      setUser({ data: { email: userInfoRes.data.email }, status: "finish" });
  }, [userInfoSuccess]);

  useDidUpdate(() => {
    if (userInfoError) {
      setUser({ status: "error", data: {} });
      setJsonToken({ token: "", status: "loading" });
    }
  }, [userInfoError]);

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
    if (!cuteJsonToken && userInfoError) JsonTokenMutate.mutate();
    else setJsonToken({ token: cuteJsonToken, status: "finish" });
  }, [userInfoError]);

  return {};
};
export default useRootProvider;
