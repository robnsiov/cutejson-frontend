"use client";

import Tooltip from "@/components/shared/tooltip";
import ApiProps from "./types";
import { Badge } from "@/components/ui/badge";
import { useClipboard } from "@mantine/hooks";
import cls from "classnames";

const Api = ({ method, url }: ApiProps) => {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <>
      <div className="mb-1 last:mb-0">
        <Tooltip message={"copy"} side="bottom">
          <span
            onClick={() => clipboard.copy(url)}
            className={cls("cursor-pointer mr-3", {
              "text-green-500": clipboard.copied,
            })}
          >
            {url}
          </span>
        </Tooltip>
        <Badge variant="outline">{method}</Badge>
      </div>
    </>
  );
};
export default Api;
