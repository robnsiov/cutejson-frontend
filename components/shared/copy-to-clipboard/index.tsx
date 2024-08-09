import { Copy, CopySuccess } from "iconsax-react";
import CopyToClipboardProps from "./types";
import { Badge } from "@/components/ui/badge";
import Tooltip from "../tooltip";
import { useClipboard } from "@mantine/hooks";

const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <>
      <Badge
        variant="outline"
        className="py-[7px] text-slate-600 cursor-pointer hover:text-slate-800 transition-all duration-200"
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
