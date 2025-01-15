/** @format */
import MenuTypes from "@/types/MenuTypes";

import { BsBook, BsHouseDoor } from "react-icons/bs";

const createUrl = (path: string) => `/admin${path}`;

const setAdminMenus = async () => {
    const ListMenu: MenuTypes[] = [
        {
            name: "Home",
            href: createUrl(""),
            icon: <BsHouseDoor />,
        },
        {
            name: "Pengiriman",
            icon: <BsBook />,
            slug: "shipping",
            subMenus: [
                {
                    name: "Kecamatan",
                    href: createUrl("/shipping/subDistricts"),
                },
                {
                    name: "Kelurahan",
                    href: createUrl("/shipping/sub"),
                },
            ],
        },
        {
            name: "Kategori",
            icon: <BsBook />,
            slug: "categories",
            subMenus: [
                {
                    name: "Daftar Kategori",
                    href: createUrl("/categories/all"),
                },
                {
                    name: "Sub Kategori",
                    href: createUrl("/categories/sub"),
                },
            ],
        },
        {
            name: "Produk",
            icon: <BsBook />,
            slug: "produk",
            subMenus: [
                {
                    name: "Daftar Kategori",
                    href: createUrl("/categories/all"),
                },
                {
                    name: "Sub Kategori",
                    href: createUrl("/categories/sub"),
                },
            ],
        },
        {
            name: "Orders",
            href: createUrl("/projects"),
            icon: <BsBook />,
        },
    ];

    return ListMenu;
};

export { setAdminMenus };
