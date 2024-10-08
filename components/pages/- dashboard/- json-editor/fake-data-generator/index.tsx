import Editor from "@/components/shared/editor";
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
import PrimaryButton from "@/components/ui/primary-button";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import apis from "@/constants/apis";
import Axios from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SyntaxHighlighter from "react-syntax-highlighter";
import Tooltip from "@/components/shared/tooltip";
import CopyToClipboard from "@/components/shared/copy-to-clipboard";
import Link from "next/link";

const defaultValueOfFakerJsonEditor = {
  name: "{{person.lastName}}",
  bio: "{{person.bio}}",
  gender: "{{person.gender}}",
  phone: "{{phone.number}}",
  ip: "{{internet.ipv4}}",
  city: "{{location.city}}",
  country: "{{location.country}}",
};

const FakeDataGenerator = () => {
  const [jsonEditor, setJsonEditor] = useState("");
  const [activeTab, setActiveTab] = useState("generate");
  const [repeatParams, setRepeatParams] = useState("10");

  const generateFakeDataGenerateMutation = useMutation({
    mutationFn: (data: string) =>
      Axios({
        url: `${apis.generateFakeData}?repeat=${repeatParams}`,
        data: data,
        method: "POST",
      }),
    onSuccess() {
      setActiveTab("result");
    },
  });

  const onGenerateData = () => {
    generateFakeDataGenerateMutation.mutate(jsonEditor);
  };

  useEffect(() => {
    setJsonEditor(JSON.stringify(defaultValueOfFakerJsonEditor, null, 2));
  }, []);

  const fakeData = generateFakeDataGenerateMutation.data?.data;

  return (
    <>
      <div className="w-full flex justify-start items-start flex-col mt-3 pt-2 border-t border-dashed border-slate-200"></div>
      <Dialog>
        <DialogTrigger className="w-full justify-start" asChild>
          <Button variant="link" className="pl-0 py-0 h-auto">
            <span>Generate fake data</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate fake data</DialogTitle>
            <DialogDescription>
              You can generate fake data using the template written in the
              editor.{" "}
              <Link
                className="underline text-slate-700"
                href={"/documentation/data-generator"}
              >
                See the documentation
              </Link>
            </DialogDescription>
            <Tabs
              value={activeTab}
              className="w-full !mt-4"
              onValueChange={(tab) => setActiveTab(tab)}
            >
              <TabsList className="w-full gap-2">
                <TabsTrigger value="generate" className="w-full">
                  Generate
                </TabsTrigger>
                <TabsTrigger value="result" className="w-full">
                  Result
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="generate"
                className="w-full flex justify-start items-start flex-col"
              >
                <div className="w-full h-[200px] border-slate-300 rounded-lg border relative">
                  <Editor
                    className="w-full h-full overflow-hidden rounded-lg"
                    defaultLanguage="json"
                    onChange={(value) => setJsonEditor(value ?? "")}
                    loading={false}
                    defaultValue={
                      jsonEditor ??
                      JSON.stringify(defaultValueOfFakerJsonEditor, null, 2)
                    }
                  />
                </div>
                <Tooltip message="repeat" side="bottom">
                  <div className="flex justify-start items-start mt-2 flex-col">
                    <InputOTP
                      value={repeatParams}
                      onChange={(value) => setRepeatParams(value)}
                      maxLength={2}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </Tooltip>
                <DialogFooter className="w-full flex justify-end mt-2">
                  <PrimaryButton
                    onClick={onGenerateData}
                    loading={generateFakeDataGenerateMutation.isPending}
                    type="submit"
                  >
                    Generate
                  </PrimaryButton>
                </DialogFooter>
              </TabsContent>
              <TabsContent value="result">
                <div className="w-full mt-2  border border-slate-200 p-2 rounded-md relative">
                  {fakeData && (
                    <div className="absolute -top-4 right-6 z-10 flex justify-center items-center">
                      <CopyToClipboard
                        className="bg-white scale-75"
                        text={JSON.stringify(fakeData, null, 2)}
                      />
                    </div>
                  )}

                  <ScrollArea className={`w-full h-[262px]`} type="always">
                    <div className="w-full">
                      <SyntaxHighlighter
                        language="javascript"
                        style={docco}
                        className=" p-2 w-full !bg-transparent !text-left"
                        useInlineStyles
                        customStyle={{ color: "#2e56b5" }}
                      >
                        {fakeData && JSON.stringify(fakeData, null, 2)}
                      </SyntaxHighlighter>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default FakeDataGenerator;
