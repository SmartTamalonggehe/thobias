/** @format */

interface MenuTypes {
    truncatedName?: string;
    name: string;
    href?: string;
    icon?: JSX.Element;
    slug?: string;
    subMenus?: MenuTypes[];
}

export default MenuTypes;
