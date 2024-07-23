import { atom } from "recoil";
import UserAtomTypes from "./types";

const userAtom = atom<UserAtomTypes>({
  key: "user",
  default: { status: null, data: {} },
});

export default userAtom;
