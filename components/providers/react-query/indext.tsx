"use client";

import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ReqctQueryProviderTypes, { ToastProps } from "./types";
import Axios from "@/utils/axios";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { TOAST_FAIL_TITLE } from "@/constants/toast";

const makeQueryClient = (toast: ToastProps) => {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => console.log(error),
    }),
    mutationCache: new MutationCache({
      onError(e: Error | AxiosError) {
        if (axios.isAxiosError(e)) {
          const msg = e.response?.data.message;
          toast({
            title: TOAST_FAIL_TITLE,
            description: Array.isArray(msg) ? "Validation error" : msg,
          });
        }
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = (toast: ToastProps) => {
  if (isServer) {
    return makeQueryClient(toast);
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(toast);
    return browserQueryClient;
  }
};

const ReqctQueryProvider = ({ children }: ReqctQueryProviderTypes) => {
  const { toast } = useToast();
  const queryClient = getQueryClient(toast);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReqctQueryProvider;
