import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { AiFillCaretRight } from "react-icons/ai";
import { BsCash, BsPeopleFill } from "react-icons/bs";
import { FaChartBar, FaFileInvoice } from "react-icons/fa";


const links = [
    { name: "customers", icon: <BsPeopleFill /> },
    {
        name: "invoices",
        icon: <FaFileInvoice />,
    },
    {
        name: "payments",
        icon: <BsCash />
    }
];

export default function SideNavbar() {
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const [screenSize, setScreenSize] = useState<number | null>(null);

    useEffect(() => {
        const handleSize = () => {
            setScreenSize(window.innerWidth);
        };
        handleSize();
        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener("resize", handleSize);
        };
    }, [screenSize]);

    if (!activeMenu && screenSize && screenSize > 976) {
        setActiveMenu(true);
    }

    if (!screenSize) return null

    return (
        <div
            className={`${activeMenu ? "w-72" : "w-8"} ${screenSize <= 976 ? "fixed" : "relative"
                } bg-background shadow-md shadow-text duration-300 z-50 h-screen`}
        >
            {screenSize <= 976 ? (
                <div
                    className={`h-8 w-8 bg-white text-primary rounded-full flex justify-center items-center absolute cursor-pointer border-2 border-brown top-9 -right-3 duration-250 ${activeMenu ? "rotate-180" : ""
                        }`}
                    onClick={() => {
                        setActiveMenu(!activeMenu);
                    }}
                >
                    <AiFillCaretRight />
                </div>
            ) : null}
            <div
                className={`pl-10 pr-4 py-8 md:pt-16 h-screen w-full duration-350 transition-all  ${!activeMenu && "scale-0"
                    }`}
            >
                <div className="flex flex-col items-center justify-between gap-8 h-full">
                    <div className="rounded-md p-2 self-start">
                        <h1 className="text-2xl font-bold text-primary">EasyLedger</h1>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <NavLink
                            onClick={() => setActiveMenu(!activeMenu)}
                            to={`/dashboard`}
                            className={({ isActive }: { isActive: boolean }) =>
                                isActive
                                    ? "bg-primary flex gap-4 items-center rounded-md px-4 py-2 cursor-pointer hover:bg-primary/90 text-white"
                                    : "flex gap-4 items-center rounded-md px-4 py-2 cursor-pointer hover:bg-primary/90 hover:text-white text-text"
                            }
                            end
                        >
                            <FaChartBar />
                            <p className="capitalize">
                                Dashboard
                            </p>
                        </NavLink>
                        {links.map((item, index) => (
                            <NavLink
                                onClick={() => setActiveMenu(!activeMenu)}
                                key={index}
                                to={`/dashboard/${item.name}`}
                                className={({ isActive }: { isActive: boolean }) =>
                                    isActive
                                        ? "bg-primary flex gap-4 items-center rounded-md px-4 py-2 cursor-pointer hover:bg-primary/90 text-white"
                                        : "flex gap-4 items-center rounded-md px-4 py-2 cursor-pointer hover:bg-primary/90 hover:text-white text-text"
                                }
                            >
                                {item.icon}
                                <p className="capitalize">
                                    {item.name}
                                </p>
                            </NavLink>
                        ))}
                    </div>
                    <div className="w-full mb-8">
                        <div className="text-text flex items-center">
                            <NavLink to={'/'}>
                                <p>Log out</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
