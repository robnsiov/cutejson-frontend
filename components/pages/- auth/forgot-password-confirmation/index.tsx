"use client";
import PrimaryButton from "@/components/ui/primary-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import Axios from "@/utils/axios";
import apis from "@/constants/apis";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import pages from "@/constants/pages";
import { Button } from "@/components/ui/button";
import FormFieldElement from "@/components/ui/form-field";
import Link from "next/link";
import { TOAST_SUCCESS_TITLE } from "@/constants/toast";
import { ForgotPasswordConfirmationMutationProps } from "./types";
import { useEffect } from "react";

const forgotPasswordConfirmationSchema = z
  .object({
    password: z.string().min(8).max(34),
    confirmPassword: z.string().min(8).max(34),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const ForgotPasswordConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordConfirmationSchema>>({
    resolver: zodResolver(forgotPasswordConfirmationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (
      data: z.infer<typeof forgotPasswordConfirmationSchema> & {
        recoveryString: string;
      }
    ) =>
      Axios.post<ForgotPasswordConfirmationMutationProps>(
        apis.forgotPasswordConfirmation,
        data
      ),
    onSuccess(res) {
      toast({ title: TOAST_SUCCESS_TITLE, description: res.data.message });
      router.replace(`${pages.auth}?form=signin`);
    },
  });

  const recoveryString = searchParams.get("recovery");

  const onSubmit = (data: z.infer<typeof forgotPasswordConfirmationSchema>) => {
    mutation.mutate({ ...data, recoveryString: recoveryString! });
  };

  useEffect(() => {
    if (!recoveryString) router.replace("/");
  }, [recoveryString]);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col min-h-screen">
        <div className="flex justify-center items-center flex-col text-center">
          <h1 className="font-bold text-2xl mb-1">
            Forgot password confirmation
          </h1>
          <span className="text-gray-500">Enter your new password below</span>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex justify-center items-center flex-col sm:w-[320px] w-full"
            >
              <FormFieldElement
                type="password"
                control={form.control}
                placeholder="password"
                autoComplete="password"
                name="password"
              />
              <FormFieldElement
                type="password"
                control={form.control}
                placeholder="repeat password"
                autoComplete="password"
                name="confirmPassword"
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
              <Link href={`${pages.auth}?form=signin`}>
                Already have an account?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPasswordConfirmation;
