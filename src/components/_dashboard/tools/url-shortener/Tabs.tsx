import * as React from "react";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@mui/material/styles";
// material
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// import TeachersAccount from "components/_dashboard/admin/teacher/account/index";

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
            <Tab label="TechnoNatura Teacher Account" value="teacher" />
            <Tab label="TechnoNatura Staff" value="staff" />
            <Tab label="TechnoNatura Gallery" value="gallery" />
          </TabList>
        </Box>
        <TabPanel value="branch">
          {/* @ts-ignore */}
          <TechnoNaturaBranch />
        </TabPanel>
        <TabPanel value="teacher">
          {/* @ts-ignore */}
          {/* <TeachersAccount /> */}
        </TabPanel>
      </TabContext>
    </>
  );
}
