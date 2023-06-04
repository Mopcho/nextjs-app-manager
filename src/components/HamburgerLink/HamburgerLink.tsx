"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons = { Settings, User, Grid, Calendar };

interface LinkProps {
    link: {
        link: string;
        icon: keyof typeof icons;
        label: string;
    }
}
  

const HamburgerLink: React.FC<LinkProps> = ({ link }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];
  return (
    <Link href={link.link} className="w-full flex items-center gap-5">
      <Icon
        size={40}
        className={clsx(
            "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
            isActive && "stroke-violet-600"
            )}
            />
        <h3 className="text-3xl">{link.label}</h3>
    </Link>
  );
};

export default HamburgerLink;