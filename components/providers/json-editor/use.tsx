import jsonTokenAtom from "@/recoil/json-token-atom";
import { useRecoilState } from "recoil";

const useJsonEditorProvider = () => {
  const [jsonToken] = useRecoilState(jsonTokenAtom);
  return { jsonToken };
};

export default useJsonEditorProvider;
