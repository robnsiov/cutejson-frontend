export default interface JsonDBAtomProps {
  db: string;
  status: "loading" | "error" | "finish" | null;
}
