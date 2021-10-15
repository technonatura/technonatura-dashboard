import * as React from "react";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@mui/styles";
// material
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Classes from "./class";
import Archives from "./archives";

// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

export default function ClassroomPage() {
  const [tab, setTab] = React.useState("class");

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
            <Tab label=" Class" value="class" />
            <Tab label=" Archives" value="archives" />
          </TabList>
        </Box>
        <TabPanel value="class">
          <Classes />
        </TabPanel>
        <TabPanel value="archives">
          <Archives />
        </TabPanel>
      </TabContext>
    </>
  );
}
