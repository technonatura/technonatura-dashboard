import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import NextLink from "next/link";

// material
import { styled } from "@mui/material/styles";
// material
import {
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";

// import { AppWeeklySales } from "components/_dashboard/app";

import MainCard from "components/cards/main";

// components
import Page from "components/Page";
import ProjectList from "@/components/_dashboard/project/ProjectList";

import checkRoles from "@utils/checkRoles";

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

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

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );
  if (authState.me && !authState.me.isAccountVerified) {
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
                  Only Verified User Have an Access To This Feature
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

  if (authState.me && checkRoles(authState.me.roles, "teacher")) {
    return (
      <Alert severity="info">
        <AlertTitle>Teacher account doesn&apos;t have permission</AlertTitle>
        We are sorry that Teacher account doesn&apos;t have permission to post a
        project
      </Alert>
    );
  }

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <NextSeo
        title="TechnoNatura App - Manage Project"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={5}
            // @ts-ignore
            md={8}
          >
            <MainCard
              title="Welcome to Your Project Dashboard!"
              description="You can manage project through this page."
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            // @ts-ignore
            md={4}
          >
            <MainCard
              title="Help Centre"
              description="Visit our Story HC for more."
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
          <ProjectList />
        </Box>
      </Container>
    </>
  );
}
