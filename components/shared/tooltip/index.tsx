import {
  Tooltip as Tip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipProps from "./types";
const Tooltip = ({ children, message, side = "left" }: TooltipProps) => {
  return (
    <>
      <TooltipProvider delayDuration={100}>
        <Tip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            side={side}
            className="border-slate-200b border text-inherit bg-white"
          >
            <p>{message}</p>
          </TooltipContent>
        </Tip>
      </TooltipProvider>
    </>
  );
};

export default Tooltip;
