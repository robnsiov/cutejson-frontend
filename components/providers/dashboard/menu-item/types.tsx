import { Icon } from "iconsax-react";

export default interface MenuItemElementProps {
  title: string;
  icon?: Icon;
  href: string;
  exactly?: boolean;
  children?: Array<MenuItemElementProps>;
}
