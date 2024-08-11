"use client";

import { Button } from "@/components/ui/button";
import DashboardProviderProps from "./types";
import Link from "next/link";
import {
  BatteryFull,
  DocumentText,
  HambergerMenu,
  Home2,
  TriangleLogo,
} from "iconsax-react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import cls from "classnames";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import pages from "@/constants/pages";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tooltip from "@/components/shared/tooltip";
import { useRecoilState } from "recoil";
import menuIsOpenAtom from "@/recoil/menu-is-open-atom";
import useDashboardProvider from "./use";

const menuItems = [
  { title: "Json Editor", icon: DocumentText, href: pages.dashboard },
];

const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useRecoilState(menuIsOpenAtom);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const { user } = useDashboardProvider();

  const menuItemsElements = () => {
    return (
      <>
        {menuItems.map(({ icon: Icon, title, href }) => (
          <Button
            className="w-full"
            key={title}
            variant={pathname === href ? "secondary" : "ghost"}
          >
            <Link
              href={href}
              className="w-full flex justify-start items-center overflow-hidden"
            >
              <Icon className="mr-3 min-w-6 " size="24" variant="Broken" />
              <span>{title}</span>
            </Link>
          </Button>
        ))}
      </>
    );
  };

  const userEmail = user.data.email;

  return (
    <>
      <div className="w-full h-screen">
        <div className="flex justify-start items-start flex-col">
          <div
            className="w-full h-[58px] border-b-slate-200 border-b
          flex justify-between items-center px-4"
          >
            <HambergerMenu
              onClick={() => setSheetIsOpen(true)}
              className="text-lg cursor-pointer lg:hidden"
            />
            <Link href={pages.dashboard}>
              <TriangleLogo />
            </Link>
            {user.status === "error" && (
              <div className="flex justify-center items-center">
                <Button variant={"link"}>
                  <Link href={`${pages.auth}?form=signin`}>Sign-in</Link>
                </Button>
                <span>/</span>
                <Button variant={"link"}>
                  <Link href={`${pages.auth}?form=signup`}>Sign-up</Link>
                </Button>
              </div>
            )}
            {userEmail && (
              <Tooltip message={userEmail}>
                <Button className="uppercase" variant="secondary">
                  {userEmail.at(0)}
                </Button>
              </Tooltip>
            )}
          </div>
          <div className="w-full flex justify-start items-start">
            <div
              className={cls(
                `h-[calc(100vh-58px)] border-r-slate-200 border-r
            lg:flex hidden justify-start items-center flex-col p-3 space-y-2 pt-10 relative
             transition-all duration-300`,
                menuIsOpen ? "min-w-[250px] w-[250px]" : "min-w-[80px] w-[80px]"
              )}
            >
              <Button
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                variant="outline"
                size="icon"
                className="absolute top-4 -right-3.5 h-auto w-auto p-1 rounded-full"
              >
                <ChevronRight className="size-4" />
              </Button>

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetContent side={"left"} className="px-2">
                  <VisuallyHidden.Root>
                    <SheetHeader>
                      <SheetTitle></SheetTitle>
                      <SheetDescription></SheetDescription>
                    </SheetHeader>
                  </VisuallyHidden.Root>
                  <div className="w-full flex justify-center items-center flex-col mt-6">
                    {menuItemsElements()}
                  </div>
                </SheetContent>
              </Sheet>

              {menuItemsElements()}
            </div>
            <div className="w-full lg:p-5 lg:pl-8 p-4">
              <ScrollArea
                type="always"
                className="w-full h-[calc(100vh-98px)] pr-4"
              >
                {children}
              </ScrollArea>
            </div>

            {/* <div className="w-full lg:p-5 lg:pl-8 p-4 h-[calc(100vh-78px)] overflow-auto"></div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardProvider;
