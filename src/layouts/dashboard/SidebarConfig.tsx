import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import settingsFill from "@iconify/icons-eva/settings-2-fill";
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
