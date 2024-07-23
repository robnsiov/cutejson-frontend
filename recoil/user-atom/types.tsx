export default interface UserAtomTypes {
  status: "loading" | "error" | "finish" | null;
  data: { email?: string };
}
