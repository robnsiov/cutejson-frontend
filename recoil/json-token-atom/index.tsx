import { atom } from "recoil";
import JsonTokenAtomTypes from "./types";

const jsonTokenAtom = atom<JsonTokenAtomTypes>({
  key: "json-token",
  default: { token: null, status: null },
});

export default jsonTokenAtom;
