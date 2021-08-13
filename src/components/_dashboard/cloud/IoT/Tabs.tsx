import * as React from "react";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@material-ui/core/styles";
// material
import { Box, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import IoTCloudApps from "./apps";
// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

export default function RolesPage() {
  const [tab, setTab] = React.useState("apps");

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
            <Tab label="My Apps" value="apps" />
            <Tab label="Shared With Me" value="shared" />
            <Tab label="API Docs" value="docs" />
          </TabList>
        </Box>
        <TabPanel value="apps">
          {/* @ts-ignore */}
          <IoTCloudApps sharedWithMe={false} />
        </TabPanel>
        <TabPanel value="shared">
          {/* @ts-ignore */}
          <IoTCloudApps sharedWithMe />
        </TabPanel>
      </TabContext>
    </>
  );
}
