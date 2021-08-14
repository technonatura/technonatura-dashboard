import * as React from "react";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@material-ui/core/styles";
// material
import { Box, Tab, Typography } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import { TeammateInterface } from "types/models/IoT/IoTApp.model";
import CheckTeammate from "utils/checkTeammate";

import {
  IoTAppInterface,
  sensorInterfaceI,
} from "@/types/models/IoT/IoTApp.model";

import IoTCloudAppSensors from "./index";
import SettingsAppInfo from "./settings/sensorInfo";
import DangerZone from "./settings/dangerZone";

// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

export default function RolesPage({
  app,
  sensor,
}: {
  app: IoTAppInterface;
  sensor: sensorInterfaceI;
}) {
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
            <Tab label="My Sensors" value="apps" />
            <Tab label="Settings" value="settings" />
          </TabList>
        </Box>
        <TabPanel value="apps">
          {/* @ts-ignore */}
          <IoTCloudAppSensors sharedWithMe={false} sensor={sensor} />
        </TabPanel>
        <TabPanel value="settings">
          {/* @ts-ignore */}
          <Typography variant="h5" color="grayText">
            TechnoNatura Cloud App - Settings
          </Typography>
          {CheckTeammate(
            app.team,
            // @ts-ignore
            authState.me?._id,
            ["owner"]
          ) && <SettingsAppInfo desc={sensor.desc} name={sensor.name} />}
          {/* @ts-ignore */}
          <DangerZone name={sensor.name} teammate={app.team} />
        </TabPanel>
      </TabContext>
    </>
  );
}
