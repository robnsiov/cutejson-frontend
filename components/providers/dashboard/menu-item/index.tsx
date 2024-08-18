import { Button } from "@/components/ui/button";
import MenuItemElementProps from "./types";
import MenuItemProps from "./types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import cls from "classnames";

const MenuItemElement = ({
  href,
  icon: Icon,
  title,
  children,
  className,
}: MenuItemElementProps & { className?: string }) => {
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className={twMerge(`w-full`, className)}
        key={title}
        variant={pathname.includes(href) ? "secondary" : "ghost"}
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
                className={cls({ "rotate-180": menuIsOpen })}
                size="12"
              />
            )}
          </div>
        </Link>
      </Button>
      {children &&
        menuIsOpen &&
        children.length !== 0 &&
        children.map((menu) => <MenuItemElement {...menu} key={menu.title} />)}
    </>
  );
};

export default MenuItemElement;
