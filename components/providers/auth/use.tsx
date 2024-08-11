import pages from "@/constants/pages";
import jsonDBAtom from "@/recoil/json-db-atom";
import jsonTokenAtom from "@/recoil/json-token-atom";
import userAtom from "@/recoil/user-atom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useAuthProvider = () => {
  const [user] = useRecoilState(userAtom);
  const [jsonToken] = useRecoilState(jsonTokenAtom);
  const router = useRouter();

  useEffect(() => {
    if (user.status === "finish") router.replace(pages.dashboard);
  }, [user]);

  return { user, jsonToken };
};
export default useAuthProvider;
