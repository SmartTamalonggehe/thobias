import { FC, useCallback, useEffect, useState } from "react";
import SubMenu from "./SubMenu";
import { useMenuContext } from "@/context/MenuContext";
import { AnimatePresence, motion } from "framer-motion";
import { setAdminMenus } from "./ListMenu";
import MenuTypes from "@/types/MenuTypes";
import { Link } from "@inertiajs/react";

type Props = {
    type?: string;
};

const MobileSide: FC<Props> = ({ type = "admin" }) => {
    const { isOpen } = useMenuContext();
    const [menus, setMenus] = useState<MenuTypes[]>([]);
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [loadLogout, setLoadLogout] = useState(false);
    // pathname
    const { pathname } = window.location;
    // ketika type berubah
    const getMenuDynamic = useCallback(async () => {
        let res: MenuTypes[] = [];
        if (type === "admin") {
            res = await setAdminMenus();
        }
        setMenus(res);
    }, [type]);

    useEffect(() => {
        getMenuDynamic();
    }, [getMenuDynamic]);

    // submenu
    const findOpenMenus = (menuList: MenuTypes[]) => {
        for (const menu of menuList) {
            // console.log({ slug, menu });
            if (menu?.href === pathname) {
                const second = pathname?.split("/");
                // if second.length > 0 remove index 0
                second.splice(0, 1);
                setOpenMenus(second);
            }
            // console.log({ menu });
            if (menu.subMenus) {
                // console.log({ menu });
                findOpenMenus(menu.subMenus);
            }
        }
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        menus && findOpenMenus(menus);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menus, pathname]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: -300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                >
                    <div className="h-full px-3 py-4 overflow-auto bg-fourth/80 text-third">
                        <div className="flex flex-col gap-4 h-full sidebar w-full overflow-auto">
                            <ul className="space-y-2 grow w-full h-full overflow-auto list-none p-0">
                                {menus &&
                                    menus.map((menu, index) => {
                                        const isActive = pathname === menu.href;
                                        const subMenus = menu?.subMenus;
                                        const { name, icon, slug } = menu;
                                        return subMenus ? (
                                            SubMenu({
                                                subMenus,
                                                name,
                                                icon,
                                                slug,
                                                index,
                                                pathname,
                                                openMenus,
                                                truncatedName: name,
                                            })
                                        ) : (
                                            <li key={index}>
                                                <Link
                                                    href={menu.href || "#"}
                                                    className={`flex w-full dark:text-neutral items-center p-2 hover:text-neutral transition-all duration-300 rounded-lg group ${
                                                        isActive &&
                                                        "dark:text-secondary text-secondary font-bold"
                                                    }`}
                                                >
                                                    {icon}
                                                    <span className="ms-3">
                                                        {name}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                            {loadLogout ? (
                                <span className="loading loading-dots loading-md" />
                            ) : (
                                <div className="flex justify-center">
                                    <button
                                        className="btn btn-primary text-neutral"
                                        // onClick={() =>
                                        //     handleLogout({
                                        //         setLogout,
                                        //         setLoadLogout,
                                        //         route,
                                        //     })
                                        // }
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileSide;
