// import Image from "next/image";
// import logo from "@/assets/images/logo.png";
import SidebarLink from '../SidebarLink/SidebarLink';
import Card from "../Card/Card";
import LogoutButton from '../LogoutButton/LogoutButton';

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
  }
] as const;

const Sidebar = () => {
  return (
    <Card className="h-full w-40 items-center justify-between flex-wrap hidden lg:flex md:flex xl:flex">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label}/>
      ))}
      <LogoutButton></LogoutButton>
    </Card>
  );
};

export default Sidebar;