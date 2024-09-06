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
import { useRouter } from "next/navigation";
import pages from "@/constants/pages";
import { Button } from "@/components/ui/button";
import FormFieldElement from "@/components/ui/form-field";
import Link from "next/link";
import { ForgotPasswordMutationProps } from "./types";
import { TOAST_SUCCESS_TITLE } from "@/constants/toast";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof forgotPasswordSchema>) =>
      Axios.post<ForgotPasswordMutationProps>(apis.forgotPassword, data),
    onSuccess(res) {
      toast({ title: TOAST_SUCCESS_TITLE, description: res.data.message });
      router.replace("/");
    },
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col min-h-screen">
        <div className="flex justify-center items-center flex-col text-center">
          <h1 className="font-bold text-2xl mb-1">Forgot password</h1>
          <span className="text-gray-500">
            Enter your email below to get confirmation email
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
export default ForgotPassword;
