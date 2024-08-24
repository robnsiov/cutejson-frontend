"use client";
import { Button } from "@/components/ui/button";
import DocumentationProviderProps from "./types";
import pages from "@/constants/pages";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cls from "classnames";

const documentationPages = [
  { path: pages.documentation, name: "Get Started" },
  { path: pages.getDocumentation, name: "GET" },
  { path: pages.postDocumentation, name: "POST" },
  { path: pages.putDocumentation, name: "PUT" },
  { path: pages.deleteDocumentation, name: "DELETE" },
  { path: pages.dataGeneratorDocumentation, name: "Data generator" },
];

const DocumentationProvider = ({ children }: DocumentationProviderProps) => {
  const pathname = usePathname();

  let nextIndex = -1;
  let prevIndex = -1;
  const currentIndex = documentationPages.findIndex(
    ({ path }) => path === pathname
  );
  if (documentationPages[currentIndex - 1]) prevIndex = currentIndex - 1;
  if (documentationPages[currentIndex + 1]) nextIndex = currentIndex + 1;

  return (
    <>
      <div className="w-full min-h-[calc(100vh-100px)] flex justify-between items-center flex-col pb-0.5">
        {children}
        <div
          className={cls(
            `w-full flex items-center`,
            prevIndex === -1 ? "justify-end" : "justify-between"
          )}
        >
          {prevIndex !== -1 && (
            <Link href={documentationPages[prevIndex].path}>
              <Button
                variant="outline"
                className="h-auto flex justify-start items-start flex-col"
              >
                <span className="text-[10px]">Prev</span>
                <span>{documentationPages[prevIndex].name}</span>
              </Button>
            </Link>
          )}
          {nextIndex !== -1 && (
            <Link href={documentationPages[nextIndex].path}>
              <Button
                variant="outline"
                className="h-auto flex justify-start items-start flex-col"
              >
                <span className="text-[10px]">Next</span>
                <span>{documentationPages[nextIndex].name}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentationProvider;
