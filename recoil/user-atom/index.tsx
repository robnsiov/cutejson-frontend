import { atom } from "recoil";
import UserAtomProps from "./types";

const userAtom = atom<UserAtomProps>({
  key: "user",
  default: { status: null, data: {} },
});

export default userAtom;
