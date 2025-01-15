import React from "react";
import MenuContextProvider from "./context/MenuContext";
import WelcomeContextProvider from "./context/WelcomeContext";
import Sidebar from "./Components/sidebar/Sidebar";
import HeaderAdmin from "./Components/header/HeaderAdmin";
import MobileSide from "./Components/sidebar/Mobile";

type Props = {
    children: React.ReactNode;
};

const LayoutPage = ({ children }: Props) => {
    return (
        <MenuContextProvider>
            <WelcomeContextProvider>
                <div className="min-h-screen w-full font-Cocomat-Pro text-black overflow-hidden bg-white dark:bg-gray-900">
                    {/* sidebar */}
                    <div className="fixed left-0 top-0 bottom-0 lg:w-52 bg-fourth/80 z-50 hidden lg:block">
                        <Sidebar />
                    </div>
                    <div className="w-full flex">
                        <div className="lg:ml-52 flex flex-col min-h-screen grow overflow-hidden w-full ">
                            {/* judul */}
                            <div className="h-10 shadow-sm shadow-fourth text-gray-900">
                                <HeaderAdmin />
                            </div>
                            {/* mobile menu */}
                            <MobileSide />
                            {/* content */}
                            <div className="grow px-4 lg:mr-2 rounded-lg py-2 text-gray-900 dark:text-neutral">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Auth /> */}
            </WelcomeContextProvider>
        </MenuContextProvider>
    );
};

export default LayoutPage;
