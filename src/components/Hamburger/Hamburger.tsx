'use client'
import { useEffect, useState } from "react";
import { Menu, X } from "react-feather";
import Card from "../Card/Card";
import ReactDOM from "react-dom";
import HamburgerLink from "../HamburgerLink/HamburgerLink";

const links = [
    { label: "Home", icon: "Grid", link: "/home" },
    {
      label: "Calendar",
      icon: "Calendar",
      link: "/calendar",
    },
    { label: "Profile", icon: "User", link: "/profile" },
    {
      label: "Settings",
      icon: "Settings",
      link: "/settings",
    },
  ] as const;

export const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [portalNode, setPortalNode] = useState<HTMLElement | null>();

    useEffect(() => {
         setPortalNode(document.getElementById('modal-sidebar'));
    }, []);
    const openHamburger = () => {
        setIsOpen(true);
    }

    const closeHamburger = () => {
        setIsOpen(false);
    }

    const SideMenuContent = () => {
        return (
            <div className="w-3/4 h-[100dvh] absolute right-0 top-0 bg-white p-7 flex flex-col justify-between">
                <div className="flex flex-col gap-5 w-full">
                    {links.map((link) => <HamburgerLink link={link} key={link.label}/>)}
                </div>
                <button onClick={() => closeHamburger()} className="top-0 w-full bg-red-600 py-4 text-white text-3xl flex justify-center items-center"><X size={48} color="white"></X> Close</button>
            </div>
        )
    }

    return (
        <>
            {!isOpen ? (<Card className="flex md:hidden lg:hidden xl:hidden w-full justify-center items-center">
                <Menu size="48" color="black" onClick={() => openHamburger()}></Menu>
            </Card>) : null}
            {isOpen ? ReactDOM.createPortal(<SideMenuContent />, portalNode as HTMLElement) : null}
        </>

    )
}