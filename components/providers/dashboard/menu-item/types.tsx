import { Icon } from "iconsax-react";

export default interface MenuItemElementProps {
  title: string;
  icon?: Icon;
  href: string;
  children?: Array<MenuItemElementProps>;
}
