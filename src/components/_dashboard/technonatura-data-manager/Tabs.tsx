import * as React from "react";

import axios from "axios";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@material-ui/core/styles";
// material
import { Box, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { StoryPostI } from "@/types/models/Story/Story.model";

import TechnoNaturaBranch from "./branch";
// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

export default function RolesPage() {
  const [tab, setTab] = React.useState("branch");

  const handleChange = (event: any, newValue: any) => {
    setTab(newValue);
  };

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="TechnoNatura Branch" value="branch" />
            <Tab label="Drafts" value="private" />
            <Tab label="Unvisible" value="unlist" />
          </TabList>
        </Box>
        <TabPanel value="branch">
          {/* @ts-ignore */}
          <TechnoNaturaBranch />
        </TabPanel>
        <TabPanel value="private">
          {/* @ts-ignore */}
          halo this is drafts
        </TabPanel>
        <TabPanel value="unlist">
          {/* @ts-ignore */}
          halo this is Unvisible
        </TabPanel>
      </TabContext>
    </>
  );
}
