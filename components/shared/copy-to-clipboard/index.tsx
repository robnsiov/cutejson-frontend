import { Badge } from "@/components/ui/badge";
import { useClipboard } from "@mantine/hooks";
import { Copy, CopySuccess } from "iconsax-react";
import { twMerge } from "tailwind-merge";
import Tooltip from "../tooltip";
import CopyToClipboardProps from "./types";

const CopyToClipboard = ({ text, className }: CopyToClipboardProps) => {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <>
      <Badge
        variant="outline"
        className={twMerge(
          `py-[7px] text-slate-600 cursor-pointer hover:text-slate-800 transition-all duration-200`,
          className
        )}
        onClick={() => clipboard.copy(text)}
      >
        <Tooltip message="copy" side="bottom">
          {clipboard.copied ? <CopySuccess size="20" /> : <Copy size="20" />}
        </Tooltip>
      </Badge>
    </>
  );
};
export default CopyToClipboard;
