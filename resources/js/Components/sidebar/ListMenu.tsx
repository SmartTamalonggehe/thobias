/** @format */
import MenuTypes from "@/types/MenuTypes";

import { BsBook, BsHouseDoor } from "react-icons/bs";

const createUrl = (path: string) => `/${path}`;

const setAdminMenus = async () => {
    const ListMenu: MenuTypes[] = [
        {
            name: "Home",
            href: createUrl(""),
            icon: <BsHouseDoor />,
        },
        {
            name: "Orders",
            href: createUrl("/projects"),
            icon: <BsBook />,
        },
        {
            name: "Categories",
            icon: <BsBook />,
            subMenus: [
                {
                    name: "All Categories",
                    href: createUrl("/categories/all"),
                },
                {
                    name: "Sub Categories",
                    href: createUrl("/categories/sub"),
                },
            ],
        },
    ];

    return ListMenu;
};

export { setAdminMenus };
