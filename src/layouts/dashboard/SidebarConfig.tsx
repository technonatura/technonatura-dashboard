import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import settingsFill from "@iconify/icons-eva/settings-2-fill";
import Cloud from "@iconify/icons-ant-design/cloud-server";

// import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
// import fileTextFill from "@iconify/icons-eva/file-text-fill";
// import lockFill from "@iconify/icons-eva/lock-fill";
// import personAddFill from "@iconify/icons-eva/person-add-fill";
// import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

// ----------------------------------------------------------------------

const getIcon = (name: object) => <Icon icon={name} width={22} height={22} />;

interface sidebarConfigFoundation {
  title: string;
  path: string;
  // eslint-disable-next-line no-undef
  icon: typeof getIcon | JSX.Element;
  info?: string;
}

export interface sidebarConfigItem extends sidebarConfigFoundation {
  children?: sidebarConfigFoundation[];
}

const sidebarConfig: sidebarConfigItem[] = [
  {
    title: "dashboard",
    path: "/",
    icon: getIcon(pieChart2Fill),
  },
  // {
  //   title: "Blog",
  //   path: "/settings",
  //   icon: getIcon(Cloud),
  //   children: [
  //     {
  //       title: "discover",
  //       path: "/blog/discover",
  //       icon: getIcon(settingsFill),
  //     },
  //     {
  //       title: "My Post",
  //       path: "/blog/",
  //       icon: getIcon(settingsFill),
  //     },
  //   ],
  // },
  {
    title: "Cloud",
    path: "/cloud",
    icon: getIcon(Cloud),
    children: [
      {
        title: "Arduino Apps",
        path: "/cloud/arduino",
        icon: getIcon(settingsFill),
      },
      // {
      //   title: "Auth Apps",
      //   path: "/cloud/auth",
      //   icon: getIcon(settingsFill),
      // },
    ],
  },
  {
    title: "settings",
    path: "/settings",
    icon: getIcon(settingsFill),
    children: [
      {
        title: "User Data",
        path: "/settings/user",
        icon: getIcon(settingsFill),
      },
      {
        title: "Privacy Data",
        path: "/settings/privacy",
        icon: getIcon(settingsFill),
      },
    ],
  },
];

export default sidebarConfig;
