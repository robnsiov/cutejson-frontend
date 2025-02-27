"use client";

import Tooltip from "@/components/shared/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apis from "@/constants/apis";
import userAtom from "@/recoil/user-atom";
import Axios from "@/utils/axios";
import { useClipboard } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { ArrowRotateLeft } from "iconsax-react";
import { CheckCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import renewTokenMutationProps from "./types";

const CuteJsonToken = () => {
  const [token, setToken] = useState("");
  const [user] = useRecoilState(userAtom);
  const clipboard = useClipboard({ timeout: 2000 });

  useEffect(() => {
    const token = localStorage.getItem("cute-json-token");
    if (token) setToken(token);
  }, []);

  const renewTokenMutation = useMutation({
    mutationFn: () =>
      Axios<renewTokenMutationProps>({ method: "POST", url: apis.revokeToken }),
    onSuccess(res) {
      const token = res.data.db;
      localStorage.setItem("cute-json-token", token);
      setToken(token);
    },
  });

  const renewToken = () => {
    if (renewTokenMutation.isPending) return;
    renewTokenMutation.mutate();
  };

  return (
    <>
      <div className="md:min-w-[328px] min-w-full">
        <div className="border border-slate-200 rounded-lg w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  cute-json-token{" "}
                  {clipboard.copied && (
                    <CheckCheck className="inline-block size-4 ml-2" />
                  )}
                </TableHead>
                <TableHead>action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow>
                <TableCell>
                  <Tooltip message="copy" side="bottom">
                    <span
                      onClick={() => clipboard.copy(token)}
                      className="cursor-pointer max-w-[200px] min-h-2 inline-block break-all"
                    >
                      {token}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {user.status === "finish" ? (
                    <Tooltip message="re-new" side="bottom">
                      <div className="flex justify-center items-center">
                        {renewTokenMutation.isPending && (
                          <Loader2 className="size-4 animate-spin" />
                        )}
                        {!renewTokenMutation.isPending && (
                          <ArrowRotateLeft
                            onClick={renewToken}
                            size="16"
                            className="mx-auto cursor-pointer"
                          />
                        )}
                      </div>
                    </Tooltip>
                  ) : (
                    <div className="flex justify-center items-center">
                      <span>-</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CuteJsonToken;
