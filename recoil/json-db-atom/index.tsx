import { atom } from "recoil";
import JsonDBAtomProps from "./types";

const jsonDBAtom = atom<JsonDBAtomProps>({
  key: "json-db-atom",
  default: { db: "{}", status: null },
});

export default jsonDBAtom;
