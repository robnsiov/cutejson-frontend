"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import FormFieldElement from "@/components/ui/form-field";
import PrimaryButton from "@/components/ui/primary-button";
import apis from "@/constants/apis";
import { useMutation } from "@tanstack/react-query";
import Axios from "@/utils/axios";
import { TOAST_SUCCESS_TITLE } from "@/constants/toast";
import { ChangeEvent, useRef, useState } from "react";

const contactUsSchema = z.object({
  email: z.string().email(),
  message: z.string().min(5).max(4500),
});

const ContactUs = () => {
  const { toast } = useToast();

  const [files, setFiles] = useState<FileList | null>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const inputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.currentTarget.files);
  };

  const mutation = useMutation({
    mutationFn: (data: FormData) => Axios.post(apis.contatcUs, data),
    onSuccess(res) {
      toast({ title: TOAST_SUCCESS_TITLE, description: res.data.message });
      form.reset();
      setFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const onSubmit = (data: z.infer<typeof contactUsSchema>) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("message", data.message);
    if (files) {
      Array.from({ length: files.length }).forEach((_, i) =>
        formData.append("file", files[i])
      );
    }

    mutation.mutate(formData);
  };

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-180px)]">
      <div className="max-w-lg w-full">
        <div>
          <div className="text-slate-500">
            Fill out the form below to get in touch with{" "}
            <Button variant={"link"} className="p-0">
              <Link target="_blank" href={"https://github.com/robnsiov"}>
                Robnsiov
              </Link>
            </Button>
            .
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 flex justify-center items-center flex-col sm:w-[400px] w-full sm:px-0 px-1"
          >
            <FormFieldElement
              type="text"
              control={form.control}
              placeholder="name@example.com"
              autoComplete="username"
              name="email"
            />
            <FormFieldElement
              type="text"
              control={form.control}
              placeholder="Hi Robnsiov ..."
              name="message"
              textarea={true}
            />
            <div className="w-full">
              <Input
                ref={fileInputRef}
                onChange={inputFileOnChange}
                id="files"
                type="file"
                multiple
              />
            </div>
            <div className="w-full flex justify-start items-start">
              <PrimaryButton
                loading={mutation.isPending}
                type="submit"
                className="mt-3 w-max"
              >
                Submit
              </PrimaryButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
