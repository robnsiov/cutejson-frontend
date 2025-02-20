"use client";

import CopyToClipboard from "@/components/shared/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import apis from "@/constants/apis";
import Axios from "@/utils/axios";
import { useDidUpdate } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import cls from "classnames";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const RecoveryDB = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBackupDate, setSelectedBackupDate] = useState("");
  const [firstBackupHasLoaded, setFirstBackupHasLoaded] = useState(false);

  const {
    data: backupsRes,
    isLoading: backupsIsLoading,
    refetch: backupsRefetch,
  } = useQuery({
    queryKey: ["json-db-backups"],
    queryFn: () =>
      Axios<Array<string>>({ url: apis.jsonDBBackups, method: "GET" }),
    enabled: false,
  });

  const {
    data: backupRes,
    isLoading: backupIsLoading,
    refetch: backupRefetch,
    isSuccess: backupSuccess,
  } = useQuery({
    queryKey: ["json-db-backup", selectedBackupDate],
    queryFn: () =>
      Axios({
        url: `${apis.jsonDBBackup}/${new Date(selectedBackupDate).getTime()}`,
        method: "GET",
      }),
    enabled: false,
  });

  useDidUpdate(() => {
    if (modalIsOpen) backupsRefetch();
    else {
      setFirstBackupHasLoaded(false);
      setSelectedBackupDate("");
    }
  }, [modalIsOpen]);

  useDidUpdate(() => {
    if (selectedBackupDate) backupRefetch();
  }, [selectedBackupDate]);

  const backups = backupsRes?.data ?? [];
  const backup = backupRes?.data;

  useDidUpdate(() => {
    if (backupSuccess) setFirstBackupHasLoaded(true);
  }, [backupSuccess]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full flex justify-start items-start flex-col mt-3 pt-2 border-t border-dashed border-slate-200"></div>
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogTrigger className="w-full justify-start" asChild>
          <Button variant="link" className="pl-0 py-0 h-auto">
            <span>Recover Json DB</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Recover Json DB</DialogTitle>
            <DialogDescription>
              You can recover up to 4 versions of your json DB.
            </DialogDescription>
            {backupsIsLoading && (
              <div className="w-full flex justify-center items-center !mt-4">
                <Loader2 className="size-4 animate-spin" />
              </div>
            )}
            {(backups || selectedBackupDate) && (
              <div className="w-full grid grid-cols-2 gap-2 !mt-4">
                {backups.map((backupDate) => (
                  <Button
                    onClick={() => setSelectedBackupDate(backupDate)}
                    key={backupDate}
                    className="h-auto whitespace-normal text-xs text-slate-500"
                    variant={
                      selectedBackupDate === backupDate
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {new Date(backupDate).toString()}
                  </Button>
                ))}
              </div>
            )}
            {backupIsLoading && !firstBackupHasLoaded && (
              <div className="w-full flex justify-center items-center !mt-6">
                <Loader2 className="size-4 animate-spin" />
              </div>
            )}
            {(backup || firstBackupHasLoaded) && (
              <div className="w-full border-slate-200 border p-2  rounded-md relative !mt-5">
                {!backupIsLoading && backup?.data && (
                  <div className="absolute -top-4 right-6 z-10 flex justify-center items-center">
                    <CopyToClipboard
                      className="bg-white scale-75"
                      text={JSON.stringify(backup.data, null, 2)}
                    />
                  </div>
                )}
                <div
                  className={cls(
                    `absolute z-50 inset-0 bg-slate-200 transition-all duration-200`,
                    backupIsLoading
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  )}
                ></div>
                <div className="w-full h-[200px]">
                  {backup?.data && (
                    <ScrollArea
                      className={`w-full h-[200px] relative z-10 p-2`}
                      type="always"
                    >
                      <div className="w-full overflow-hidden">
                        <SyntaxHighlighter
                          language="javascript"
                          style={docco}
                          className="!w-full p-2 !bg-transparent !text-left"
                          useInlineStyles
                          customStyle={{ color: "#2e56b5" }}
                        >
                          {JSON.stringify(backup.data, null, 2)}
                        </SyntaxHighlighter>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  )}
                </div>
              </div>
            )}
          </DialogHeader>
        </DialogContent>
        <DialogFooter className="w-full "></DialogFooter>
      </Dialog>
    </>
  );
};
export default RecoveryDB;
