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
import AuthenticationTypes, {
  AuthenticationMutationProps,
  authType,
} from "./types";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(34),
});

const Authentication = ({ selectedForm }: AuthenticationTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const [_, setUser] = useRecoilState(userAtom);
  const [socialMedia, setSocialMedia] = useState<"GITHUB" | "GOOGLE">();
  const githubRef = useClickOutside(() => setSocialMedia(undefined));
  const googleRef = useClickOutside(() => setSocialMedia(undefined));
  const { toast } = useToast();
  const [auth, setAuth] = useState<authType>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const successMessage = () =>
    toast({
      title: "Oh great.",
      description: "Your registration was successful.",
    });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      let url = "";
      if (auth === "SIGNIN") url = apis.signin;
      if (auth === "SIGNUP") url = apis.signup;
      return Axios.post<AuthenticationMutationProps>(url, data);
    },
    onSuccess(res) {
      successMessage();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("cute-json-token", res.data.db);
      setUser({ status: "finish", data: { email: res.data.email } });
      router.push(pages.dashboard);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  const socialMediaOnclick = (sm: "GOOGLE" | "GITHUB") => {
    if (sm === socialMedia) setSocialMedia(undefined);
    else setSocialMedia(sm);
  };

  useDidUpdate(() => {
    if (!socialMedia) return;
    let url = "https://google.com";
    if (socialMedia === "GITHUB") url = socialAuth.github;
    else if (socialMedia === "GOOGLE") url = socialAuth.google;

    window.open(url, socialMedia, popupCenter({ w: 450, h: 550 }));
  }, [socialMedia]);

  useEffect(() => {
    const channel = new BroadcastChannel("auth");
    channel.addEventListener("message", (e) => {
      if (e.data.error)
        toast({
          title: "Uh oh! Something went wrong.",
          description: e.data.error,
        });
      else if (e.data.auth) {
        successMessage();
        router.replace(pages.dashboard);
      }
    });
  }, []);

  useEffect(() => {
    setAuth(selectedForm);
  }, [selectedForm]);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col min-h-screen">
        <div className="flex justify-center items-center flex-col text-center">
          <h1 className="font-bold text-2xl mb-1">
            {auth === "SIGNUP" && "Create an account"}
            {auth === "SIGNIN" && "Log in to your account"}
          </h1>
          <span className="text-gray-500">
            Enter your email below to{" "}
            {
              <>
                {auth === "SIGNIN" && "login to"}
                {auth === "SIGNUP" && "create"}
              </>
            }{" "}
            your account
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
              <FormFieldElement
                type="password"
                control={form.control}
                placeholder="password"
                name="password"
                autoComplete="current-password"
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
          <div className="w-full flex justify-center items-center flex-col">
            <div
              className="w-full border-b border-gray-200 mt-8
        flex justify-center items-center"
            >
              <span className="absolute bg-white text-xs px-2 text-gray-400">
                OR CONTINUE WITH
              </span>
            </div>
            <div
              className="w-full"
              ref={githubRef}
              onClick={() => socialMediaOnclick("GITHUB")}
            >
              <PrimaryButton
                loading={socialMedia === "GITHUB"}
                className="mt-6 w-full"
                variant="outline"
              >
                <GitHubLogoIcon className="mr-1" /> GitHub
              </PrimaryButton>
            </div>
            <div
              className="w-full"
              ref={googleRef}
              onClick={() => socialMediaOnclick("GOOGLE")}
            >
              <PrimaryButton
                loading={socialMedia === "GOOGLE"}
                className="mt-2 w-full"
                variant="outline"
              >
                <Google className="text-slate-900 mr-1" size="15" /> Google
              </PrimaryButton>
            </div>
          </div>
          <div className="w-full text-center mt-5 flex justify-center items-center flex-col">
            <Button variant="link" className="pb-0">
              <Link
                href={`${pages.auth}?form=${
                  auth === "SIGNUP" ? "signin" : "signup"
                }`}
              >
                {auth === "SIGNUP" && "Already have an account?"}
                {auth === "SIGNIN" && "Don't have an account?"}
              </Link>
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
