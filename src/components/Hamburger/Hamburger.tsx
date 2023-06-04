'use client'
import { useState } from "react";
import { Menu } from "react-feather";
import Card from "../Card/Card";

export const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openHamburger = () => {
        setIsOpen(true);
    }

    return (
        <Card className="flex md:hidden lg:hidden xl:hidden w-full justify-center items-center">
            {!isOpen ? (<Menu size="48" color="black" onClick={() => openHamburger()}></Menu>) : null}
            {isOpen ? (
                <div className="w-2/3 h-screen absolute right-0 top-0 bg-white">
                    
                </div>
            ) : null}
        </Card>
    )
}