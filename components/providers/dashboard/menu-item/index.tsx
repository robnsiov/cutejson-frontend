import { Button } from "@/components/ui/button";
import documentationPages from "@/constants/documentation-pages";
import cls from "classnames";
import { ArrowDown2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import MenuItemElementProps from "./types";

const MenuItemElement = ({
  href,
  icon: Icon,
  title,
  children,
  className,
  menuIsOpen,
}: MenuItemElementProps & { className?: string; menuIsOpen?: boolean }) => {
  const pathname = usePathname();
  const [menuItemIsOpen, setmenuItemIsOpen] = useState(false);

  useEffect(() => {
    const docPage = documentationPages.find(({ path }) => path === pathname);
    if (docPage) setmenuItemIsOpen(true);
  }, [pathname]);

  return (
    <>
      <Button
        onClick={() => setmenuItemIsOpen(!menuItemIsOpen)}
        className={twMerge(`w-full mb-1`, className)}
        key={title}
        variant={pathname === href ? "secondary" : "ghost"}
      >
        <Link
          href={href}
          className="w-full flex justify-between items-center overflow-hidden"
        >
          <div className="flex justify-center items-center">
            {Icon && (
              <Icon className="mr-3 min-w-6 " size="24" variant="Broken" />
            )}

            <span className="w-full truncate">{title}</span>
          </div>
          <div>
            {children && children.length !== 0 && (
              <ArrowDown2
                className={cls({ "rotate-180": menuItemIsOpen })}
                size="12"
              />
            )}
          </div>
        </Link>
      </Button>
      {children &&
        menuIsOpen &&
        menuItemIsOpen &&
        children.length !== 0 &&
        children.map((menu) => <MenuItemElement {...menu} key={menu.title} />)}
    </>
  );
};

export default MenuItemElement;
