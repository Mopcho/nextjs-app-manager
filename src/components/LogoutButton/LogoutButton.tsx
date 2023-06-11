'use client';

import { LogOut } from "react-feather";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api";

function LogoutButton() {
    const router = useRouter();
    const onLogout = async () => {
        await logoutUser();
        router.refresh();
    }
    return (
        <LogOut onClick={() => onLogout()} size={40} className='hover:cursor-pointer stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out w-full'></LogOut>
    )
}

export default LogoutButton;