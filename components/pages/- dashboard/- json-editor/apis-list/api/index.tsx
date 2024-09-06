"use client";

import ApiProps from "./types";
import { Badge } from "@/components/ui/badge";
import CopyToClipboard from "@/components/shared/copy-to-clipboard";

const Api = ({ method, url }: ApiProps) => {
  return (
    <>
      <div className="mb-1 last:mb-0 flex justify-start items-center flex-wrap">
        <div className="flex justify-start items-center flex-wrap">
          <span>{url}</span>
          <CopyToClipboard className="bg-white scale-75 mx-1" text={url} />
        </div>
        <Badge variant="outline">{method}</Badge>
      </div>
    </>
  );
};
export default Api;
