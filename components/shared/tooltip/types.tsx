export default interface TooltipProps {
  children: React.ReactNode;
  message: string;
  side?: "left" | "top" | "right" | "bottom";
}
