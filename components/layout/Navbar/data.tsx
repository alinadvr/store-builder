import * as Icons from "@heroicons/react/24/outline";

export const adminNavigation: {
  title: string;
  icon: JSX.Element;
  subnav?: { title: string; icon: JSX.Element }[];
}[] = [
  { title: "home", icon: <Icons.HomeIcon /> },
  { title: "orders", icon: <Icons.ShoppingBagIcon /> },
  {
    title: "content",
    icon: <Icons.DocumentTextIcon />,
    subnav: [
      {
        title: "products",
        icon: <Icons.RectangleStackIcon />,
      },
      { title: "categories", icon: <Icons.ListBulletIcon /> },
      { title: "images", icon: <Icons.PhotoIcon /> },
    ],
  },
  // { title: "design", icon: <Icons.ComputerDesktopIcon /> },
  // { title: "pages", icon: <Icons.ComputerDesktopIcon /> },
  { title: "contact", icon: <Icons.ChatBubbleBottomCenterTextIcon /> },
];

export const adminSecondaryNavigation: { title: string; icon: JSX.Element }[] =
  [
    { title: "Help", icon: <Icons.HomeIcon /> },
    { title: "Send Feedback", icon: <Icons.DocumentTextIcon /> },
  ];
