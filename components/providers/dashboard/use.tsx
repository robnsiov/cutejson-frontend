import userAtom from "@/recoil/user-atom";
import { useRecoilState } from "recoil";

const useDashboardProvider = () => {
  const [user] = useRecoilState(userAtom);
  return { user };
};

export default useDashboardProvider;
