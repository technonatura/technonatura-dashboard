import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import settingsFill from "@iconify/icons-eva/settings-2-fill";
import Cloud from "@iconify/icons-ant-design/cloud-server";
import Admin from "@iconify/icons-ic/sharp-admin-panel-settings";
import Project from "@iconify/icons-eva/folder-fill";

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
  info?: string;
  forRoles: Array<string>;
}

interface sidebarConfigFoundationParent extends sidebarConfigFoundation {
  isForVerified: boolean;
  // eslint-disable-next-line no-undef
  icon: typeof getIcon | JSX.Element;
}

export interface sidebarConfigItem extends sidebarConfigFoundationParent {
  children?: sidebarConfigFoundation[];
}

const sidebarConfig: sidebarConfigItem[] = [
  {
    title: "dashboard",
    path: "/",
    icon: getIcon(pieChart2Fill),
    isForVerified: false,
    forRoles: ["user"],
  },
  {
    title: "Story",
    path: "/story",
    icon: getIcon(Cloud),
    isForVerified: true,
    forRoles: ["user"],

    children: [
      {
        title: "My Stories",
        path: "/story/my",
        forRoles: ["user"],
      },
    ],
  },
  {
    title: "Project Showcase",
    path: "/project",
    icon: getIcon(Project),
    isForVerified: true,
    forRoles: ["user"],

    children: [
      {
        title: "My Projects",
        path: "/project/my",
        forRoles: ["user"],
      },
    ],
  },
  {
    title: "Cloud",
    path: "/cloud",
    icon: getIcon(Cloud),
    isForVerified: true,
    forRoles: ["user"],

    children: [
      {
        title: "Arduino Apps",
        path: "/cloud/arduino",
        forRoles: ["user"],
      },
      {
        title: "Auth Apps",
        path: "/cloud/auth",
        forRoles: ["user"],
      },
      {
        title: "GraphQL API",
        path: "/cloud/graphql-api",
        forRoles: ["user"],
      },
    ],
  },
  {
    title: "Admin",
    path: "/admin",
    icon: getIcon(Admin),
    isForVerified: true,
    forRoles: ["admin", "teacher"],

    children: [
      {
        title: "Manage User",
        path: "/admin/user",
        forRoles: ["admin", "teacher"],
      },
      {
        title: "Manage Teacher",
        path: "/admin/teacher",
        forRoles: ["admin", "teacher"],
      },
      {
        title: "Manage Gallery",
        path: "/admin/gallery",
        forRoles: ["admin", "teacher"],
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
    isForVerified: false,
    forRoles: ["user"],

    children: [
      {
        title: "User Data",
        path: "/settings/user",
        forRoles: ["user"],
      },
      {
        title: "Privacy Data",
        path: "/settings/privacy",
        forRoles: ["user"],
      },
    ],
  },
];

export default sidebarConfig;