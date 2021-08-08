import { Icon } from "@iconify/react";
import Home from "@iconify/icons-eva/home-outline";
import settingsFill from "@iconify/icons-eva/settings-2-outline";
import Cloud from "@iconify/icons-ant-design/cloud-server";
import Admin from "@iconify/icons-ic/outline-admin-panel-settings";
import Project from "@iconify/icons-eva/folder-outline";
import Story from "@iconify/icons-eva/book-outline";

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
    icon: getIcon(Home),
    isForVerified: false,
    forRoles: [],
  },
  {
    title: "Story",
    path: "/story",
    icon: getIcon(Story),
    isForVerified: false,
    forRoles: [],

    children: [
      {
        title: "My Stories",
        path: "/story/my",
        forRoles: [],
      },
    ],
  },
  {
    title: "Project Showcase",
    path: "/project",
    icon: getIcon(Project),
    isForVerified: false,
    forRoles: [],

    children: [
      {
        title: "My Projects",
        path: "/project/my",
        forRoles: [],
      },
    ],
  },
  {
    title: "Cloud",
    path: "/cloud",
    icon: getIcon(Cloud),
    isForVerified: false,
    forRoles: [],

    children: [
      {
        title: "Arduino Apps",
        path: "/cloud/arduino",
        forRoles: [],
      },
      {
        title: "Auth Apps",
        path: "/cloud/auth",
        forRoles: [],
      },
      {
        title: "GraphQL API",
        path: "/cloud/graphql-api",
        forRoles: [],
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
      {
        title: "Manage Project",
        path: "/admin/project",
        forRoles: ["admin", "teacher"],
      },
      {
        title: "Manage Story",
        path: "/admin/story",
        forRoles: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "settings",
    path: "/settings",
    icon: getIcon(settingsFill),
    isForVerified: false,
    forRoles: [],

    children: [
      {
        title: "User Data",
        path: "/settings/user",
        forRoles: [],
      },
      {
        title: "Privacy Data",
        path: "/settings/privacy",
        forRoles: [],
      },
    ],
  },
];

export default sidebarConfig;
