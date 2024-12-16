import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "gallery",
    path: "/gallery",
    icon: <RiIcons.RiGalleryFill />,
    cName: "nav-text",
  },
  {
    title: "upload Artwork",
    path: "/uploadArtwork",
    icon: <FaIcons.FaFileUpload />,
    cName: "nav-text",
  },
  {
    title: "about",
    path: "/about",
    icon: <RiIcons.RiInformationFill />,
    cName: "nav-text",
  },
];
