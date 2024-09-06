export default interface UserAtomProps {
  status: "loading" | "error" | "finish" | null;
  data: { email?: string };
}
