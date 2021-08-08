import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import NextLink from "next/link";

// material
import { styled } from "@material-ui/core/styles";
// material
import {
  Container,
  Box,
  Typography,
  Link,
  Breadcrumbs,
  Tab,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

// components
import Page from "components/Page";

import { Icon } from "@iconify/react";
import Cloud from "@iconify/icons-ant-design/cloud-server";

// eslint-disable-next-line import/no-named-as-default
import checkRoles from "utils/checkRoles";
import TeachersAccount from "components/_dashboard/admin/teacher/account/index";
// import

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function RolesPage() {
  const authState = useSelector((state: RootStore) => state.user);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );
  if (authState.me && !checkRoles(authState.me?.roles, ["user"])) {
    return (
      <>
        <NextSeo
          title="TechnoNatura App - 404 BLOCKED"
          description="The TechnoNatura Social Media and Dashboard"
          canonical="https://dashboard.technonatura.vercel.app"
        />
        <RootStyle
          // @ts-ignore
          title="404 Page Not Found "
        >
          <Container>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <div>
                <Typography variant="h3" paragraph>
                  You do not have access to this page
                </Typography>
              </div>
              <Typography sx={{ mt: 3, color: "text.secondary" }}>
                We are sorry you do not have an access to this page :(
              </Typography>
            </Box>
          </Container>
        </RootStyle>
      </>
    );
  }
  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <NextSeo
        title="TechnoNatura App - Admin Dashboard"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <Container maxWidth="xl">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink href="/cloud">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href="#"
              >
                <Icon icon={Cloud} style={{ marginRight: 5 }} /> Cloud Service
              </Link>
            </NextLink>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              {/* <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
              Breadcrumb
            </Typography>
          </Breadcrumbs>
        </div>
        <Box sx={{ pb: 5, marginTop: 3 }}>
          <Typography variant="h3">
            Welcome to Teacher Data Management
          </Typography>
          <Typography variant="h5" color="grayText">
            In this page you can manage the data of TechnoNatura Teacher
          </Typography>
        </Box>
      </Container>
      <Box sx={{ width: "100%", typography: "body1", pl: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Teachers Account" value="1" />
              <Tab label="Staff" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* @ts-ignore */}
            <TeachersAccount />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
