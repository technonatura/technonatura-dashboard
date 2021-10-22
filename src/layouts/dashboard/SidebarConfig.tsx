import { Icon } from "@iconify/react";
import Home from "@iconify/icons-eva/home-outline";
import settingsFill from "@iconify/icons-eva/settings-2-outline";
import Cloud from "@iconify/icons-ant-design/cloud-server";
import Admin from "@iconify/icons-ic/outline-admin-panel-settings";
import ClassIcon from "@iconify/icons-ic/outline-class";
import Project from "@iconify/icons-eva/folder-outline";
import Story from "@iconify/icons-eva/book-outline";

// import Teacher from "@iconify/icons-eva/";

// import Teacher from "@iconify/icons-eva/";

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
  isForVerified: boolean;
}

interface sidebarConfigFoundationParent extends sidebarConfigFoundation {
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
    forRoles: ["user"],
  },
  {
    title: "Story",
    path: "/story",
    icon: getIcon(Story),
    isForVerified: false,
    forRoles: ["user"],

    children: [
      {
        title: "My Stories",
        path: "/story/my",
        forRoles: ["user"],
        isForVerified: false,
      },
      {
        title: "Create Stories",
        path: "/story/create",
        forRoles: [],
        isForVerified: true,
      },
    ],
  },

  {
    title: "Project",
    path: "/project",
    icon: getIcon(Project),
    isForVerified: false,
    forRoles: ["user"],
  },
  {
    title: "Tools",
    path: "/tools",
    icon: getIcon(Story),
    isForVerified: false,
    forRoles: [],

    children: [
      {
        title: "URL Shortener",
        path: "/tools/url",
        forRoles: ["user"],
        isForVerified: false,
      },
      {
        title: "Team",
        path: "/tools/team",
        forRoles: ["user"],
        isForVerified: false,
      },
    ],
  },

  {
    title: "Cloud",
    path: "/cloud",
    icon: getIcon(Cloud),
    isForVerified: false,
    forRoles: ["user"],

    children: [
      {
        title: "IoT Cloud",
        path: "/cloud/iot",
        forRoles: ["user"],
        isForVerified: false,
      },
      {
        title: "Auth Apps",
        path: "/cloud/auth",
        forRoles: ["user"],
        isForVerified: false,
      },
      {
        title: "GraphQL API",
        path: "/cloud/graphql-api",
        forRoles: ["user"],
        isForVerified: false,
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
        title: "Manage Technonatura",
        path: "/admin/technonatura",
        forRoles: ["admin", "teacher"],
        isForVerified: true,
      },
      {
        title: "Manage User",
        path: "/admin/user",
        forRoles: ["admin"],
        isForVerified: true,
      },
      {
        title: "Manage API Apps",
        path: "/admin/api",
        forRoles: ["admin"],
        isForVerified: true,
      },
    ],
  },

  {
    title: "Classroom",
    path: "/classroom",
    icon: getIcon(ClassIcon),
    isForVerified: true,
    forRoles: ["user"],
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
        forRoles: ["user"],
        isForVerified: false,
      },
      {
        title: "Privacy Data",
        path: "/settings/privacy",
        forRoles: ["user"],
        isForVerified: false,
      },
    ],
  },
];

export default sidebarConfig;
