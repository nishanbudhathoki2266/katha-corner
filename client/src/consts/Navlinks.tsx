import { ReactNode } from "react";

import { FiSearch } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

interface NavLink {
  name: string;
  icon: ReactNode;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  {
    name: "Home",
    icon: <AiOutlineHome />,
    path: "/",
  },
  {
    name: "Search",
    icon: <FiSearch />,
    path: "/search",
  },
  {
    name: "Notifications",
    icon: <IoNotificationsOutline />,
    path: "/notifications",
  },
  {
    name: "Profile",
    icon: <RiAccountCircleLine />,
    path: "/profile",
  },
  {
    name: "Collection",
    icon: <FiBookmark />,
    path: "/collection",
  },
  {
    name: "Settings",
    icon: <MdOutlineSettings />,
    path: "/settings",
  },
];

export default NAV_LINKS;
