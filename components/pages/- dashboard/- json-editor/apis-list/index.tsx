"use client";

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
import baseUrls from "@/constants/base-urls";
import jsonDBAtom from "@/recoil/json-db-atom";
import { useRecoilState } from "recoil";
import Api from "./api";

const requestsMethod = ["GET", "POST", "PUT", "DELETE"];
const ApisList = () => {
  const [jsonDB] = useRecoilState(jsonDBAtom);
  const baseUrl = baseUrls.backendApi;
  return (
    <>
      <div className="w-full flex justify-start items-start flex-col mt-3 pt-2 border-t border-dashed border-slate-200"></div>
      <Dialog>
        <DialogTrigger className="w-full justify-start" asChild>
          <Button variant="link" className="pl-0 py-0 h-auto">
            <span>Apis list</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apis list</DialogTitle>
            <DialogDescription className="text-slate-800 font-semibold !mt-4">
              <span className="mr-2">Set</span>
              <span className="bg-slate-200 break-all">
                {`req.headers["cute-json-token"] = "${localStorage.getItem(
                  "cute-json-token"
                )}"`}{" "}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[290px]">
            <ScrollArea className={"w-full h-[294px]"} type="always">
              <div className="w-full flex justify-start items-start flex-col">
                <h2 className="font-bold mb-1">DB Apis</h2>
                <div className="w-full pr-5">
                  <div
                    className="flex justify-start items-start flex-col mb-2 w-full border-b border-dashed pb-2
            border-slate-300"
                  >
                    <Api method="GET" url={`${baseUrl}/db`} />
                    <Api method="PUT" url={`${baseUrl}/db`} />
                    <Api method="DELETE" url={`${baseUrl}/db`} />
                  </div>
                </div>
                <h2 className="font-bold mb-1">Apis</h2>
                {jsonDB.status === "finish" &&
                  Object.keys(JSON.parse(jsonDB.db)).map((key) => (
                    <div
                      key={key}
                      className="flex justify-start items-start flex-col mb-1 last:mb-0"
                    >
                      {requestsMethod.map((method) => (
                        <Api
                          key={method}
                          method={method}
                          url={`${baseUrl}/db/${key}`}
                        />
                      ))}
                    </div>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </DialogContent>

        <DialogFooter className="w-full "></DialogFooter>
      </Dialog>
    </>
  );
};
export default ApisList;
