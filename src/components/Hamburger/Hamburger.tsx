'use client'
import { useEffect, useState } from "react";
import { Menu } from "react-feather";
import Card from "../Card/Card";
import ReactDOM from "react-dom";

export const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [portalNode, setPortalNode] = useState<HTMLElement | null>();

    useEffect(() => {
         setPortalNode(document.getElementById('modal-sidebar'));
    }, []);
    const openHamburger = () => {
        setIsOpen(true);
    }

    const SideMenuContent = () => {
        return (
            <div className="w-3/4 h-screen absolute right-0 top-0 bg-white">
                    
            </div>
        )
    }

    console.log(portalNode);

    return (
        <Card className="flex md:hidden lg:hidden xl:hidden w-full justify-center items-center">
            {!isOpen ? (<Menu size="48" color="black" onClick={() => openHamburger()}></Menu>) : null}
            {isOpen ? ReactDOM.createPortal(<SideMenuContent />, portalNode as HTMLElement) : null}
        </Card>
    )
}