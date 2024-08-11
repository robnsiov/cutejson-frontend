"use client";

import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/ui/primary-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import apis from "@/constants/apis";
import Axios from "@/utils/axios";
import axios, { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import cls from "classnames";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDidUpdate, useElementSize } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import jsonDBAtom from "@/recoil/json-db-atom";
import { usePrevious } from "@mantine/hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/shared/editor";
import { Badge } from "@/components/ui/badge";
import CopyToClipboard from "@/components/shared/copy-to-clipboard";
import baseUrls from "@/constants/base-urls";

const requestMethods = ["GET", "POST", "PUT", "DELETE"];
const requestBodyObjectPlaceholder = { posts: { title: "foo" } };

const Postman = () => {
  const { ref: syntaxHighlighterRef, height: syntaxHighlighterHeight } =
    useElementSize();
  const [activeRequestMethod, setActiveRequestMethod] = useState("GET");
  const [manaulRender, setManualRender] = useState(true);
  const [activeRequestUrl, setActiveRequestUrl] = useState("");
  const [requestQueryParams, setRequestQueryParams] = useState("");
  const [requestisLoading, setRequestIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState("");
  const [showRequestBody, setShowRequestBody] = useState(false);
  const previousValueOfActiveRequestUrl = usePrevious(activeRequestUrl);

  const [requestResponse, setRequestRespose] = useState<
    AxiosResponse | undefined
  >();
  const queryClient = useQueryClient();
  const [jsonDB] = useRecoilState(jsonDBAtom);

  const requestUrls = useMemo(() => {
    if (jsonDB.status !== "finish") return [];

    const urls = Object.keys(JSON.parse(jsonDB.db)).map((url) =>
      url.startsWith("/") ? url : `/${url}`
    );

    if (urls.length === 0) urls.push("/foo");
    return urls;
  }, [jsonDB]);

  const requestsUrlToString = requestUrls.join(" ");

  useEffect(() => {
    if (requestUrls[0] === "/foo") {
      setActiveRequestUrl("/foo");
    } else {
      if (
        !requestsUrlToString.includes(activeRequestUrl) ||
        !activeRequestUrl
      ) {
        setActiveRequestUrl(requestUrls[0]);
      }
    }
  }, [requestsUrlToString]);

  const sendRequest = async () => {
    try {
      setRequestIsLoading(true);
      const res = await Axios({
        method: activeRequestMethod,
        url: `${apis.userRequest}${activeRequestUrl}${requestQueryParams}`,
        data: requestBody,
      });
      setRequestRespose(res);
      setShowRequestBody(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setRequestRespose(err.response);
      }
    } finally {
      setRequestIsLoading(false);
    }
  };

  useDidUpdate(() => {
    setManualRender(!manaulRender);
  }, [requestResponse]);

  useDidUpdate(() => {
    if (!requestResponse) return;
    if (
      (activeRequestMethod === "PUT" || activeRequestMethod === "POST") &&
      requestResponse.status <= 299
    ) {
      queryClient.refetchQueries({ queryKey: ["json-db"] });
    }
  }, [requestResponse]);

  useDidUpdate(() => {
    if (activeRequestUrl !== previousValueOfActiveRequestUrl)
      setRequestRespose(undefined);
  }, [activeRequestUrl]);

  useDidUpdate(() => {
    if (!showRequestBody) setRequestBody("");
  }, [showRequestBody]);

  const onRequestBody = (value?: string) => {
    setRequestBody(value ?? "");
  };

  useDidUpdate(() => {
    if (!(activeRequestMethod === "POST" || activeRequestMethod === "PUT"))
      setShowRequestBody(false);
    if (activeRequestMethod === "POST") setRequestQueryParams("");
    setRequestRespose(undefined);
  }, [activeRequestMethod]);

  return (
    <>
      <div className="w-full flex justify-start items-start flex-col mt-3">
        <div className="w-full flex justify-between items-start flex-wrap gap-2">
          <Select
            value={activeRequestMethod}
            onValueChange={(method) => setActiveRequestMethod(method)}
          >
            <SelectTrigger className="md:w-[calc(50%-4px)] w-full">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {requestMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-center items-center md:w-[calc(50%-4px)] w-full">
            <div className="mr-2 w-full">
              <Select
                value={activeRequestUrl}
                onValueChange={(url) => setActiveRequestUrl(url)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="end-point" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {requestUrls.map((url) => (
                      <SelectItem key={url} value={url}>
                        {url}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <CopyToClipboard
              text={`${baseUrls.backendApi}/db${activeRequestUrl}`}
            />
          </div>
          {activeRequestMethod !== "POST" && (
            <Input
              type="text"
              value={requestQueryParams}
              onChange={({ target: { value } }) => setRequestQueryParams(value)}
              placeholder="?query=username&startsWith=jack"
              className="w-full placeholder:opacity-70"
              spellCheck={false}
            />
          )}

          {(activeRequestMethod === "POST" ||
            activeRequestMethod === "PUT") && (
            <div className="w-full">
              <Button
                className="h-auto p-0"
                onClick={() => setShowRequestBody(!showRequestBody)}
                variant={"link"}
              >
                Click here to {showRequestBody ? "remove" : "add"} request body
              </Button>
            </div>
          )}
          {showRequestBody && (
            <div className="w-full border border-slate-200 rounded-lg relative">
              <Badge
                className="absolute -top-3 right-6 z-20"
                variant="secondary"
              >
                Body
              </Badge>
              <Editor
                onChange={(value) => onRequestBody(value)}
                className="h-[150px] rounded-lg overflow-hidden"
                defaultLanguage="json"
                loading={false}
              />
            </div>
          )}
          {requestResponse && (
            <div className="w-full flex justify-start items-start flex-col relative">
              <div
                className={cls(
                  `w-full flex justify-start items-center`,
                  requestResponse.status <= 299
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                <span
                  className={cls(
                    `size-2 rounded-full inline-block ring-2`,
                    requestResponse.status <= 299
                      ? "bg-green-500 ring-green-200"
                      : "bg-red-500 ring-red-200"
                  )}
                ></span>
                <div
                  className="flex justify-start items-center text-xs ml-2
            font-semibold"
                >
                  {requestResponse.status}
                </div>
              </div>
              <div className="w-full mt-2  border border-slate-200 p-2 rounded-md relative">
                <Badge className="absolute -top-3 right-6" variant="secondary">
                  Response
                </Badge>

                <ScrollArea
                  className={cls(`w-full`, {
                    "h-[200px]": syntaxHighlighterHeight > 180,
                  })}
                  type="always"
                >
                  <div ref={syntaxHighlighterRef} className="w-full">
                    <SyntaxHighlighter
                      language="javascript"
                      style={docco}
                      className=" p-2 w-full !bg-transparent !text-left"
                      useInlineStyles
                      customStyle={{ color: "#2e56b5" }}
                    >
                      {JSON.stringify(requestResponse.data, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          )}

          <PrimaryButton loading={requestisLoading} onClick={sendRequest}>
            Send
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Postman;
