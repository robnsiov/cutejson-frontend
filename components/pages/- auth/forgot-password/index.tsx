"use client";
import PrimaryButton from "@/components/ui/primary-button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Google } from "iconsax-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDidUpdate } from "@mantine/hooks";
import { useClickOutside } from "@mantine/hooks";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import Axios from "@/utils/axios";
import apis from "@/constants/apis";
import { useRecoilState } from "recoil";
import userAtom from "@/recoil/user-atom";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import pages from "@/constants/pages";
import { useEffect, useMemo, useState } from "react";
import socialAuth from "@/constants/social-auth";
import popupCenter from "@/utils/popup-center";
import { Button } from "@/components/ui/button";
import FormFieldElement from "@/components/ui/form-field";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const Authentication = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [_, setUser] = useRecoilState(userAtom);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const successMessage = () =>
    toast({
      title: "Oh great.",
      description: "Your registration was successful.",
    });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof forgotPasswordSchema>) => {
      let url = "";
      return Axios.post(url, data);
    },
    onSuccess(res) {},
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col min-h-screen">
        <div className="flex justify-center items-center flex-col text-center">
          <h1 className="font-bold text-2xl mb-1">Create an account</h1>
          <span className="text-gray-500">
            Enter your email below to your account
          </span>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex justify-center items-center flex-col sm:w-[320px] w-full"
            >
              <FormFieldElement
                type="text"
                control={form.control}
                placeholder="name@example.com"
                autoComplete="username"
                name="email"
              />
              <PrimaryButton
                loading={mutation.isPending}
                type="submit"
                className="mt-3 w-full"
              >
                Submit
              </PrimaryButton>
            </form>
          </Form>

          <div className="w-full text-center mt-5 flex justify-center items-center flex-col">
            <Button variant="link" className="pb-0">
              <Link href={"/"}>000</Link>
            </Button>
            <Button variant={"link"} className="pt-0">
              <Link href={`${pages.auth}?form=forgot-password`}>
                Forgot your password?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Authentication;
