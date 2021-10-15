import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import NextLink from "next/link";

// material
import { styled } from "@mui/styles";
// material
import {
  Container,
  Box,
  Typography,
  Link,
  Grid,
  Breadcrumbs,
} from "@mui/material";

import MainCard from "components/cards/main";

// components
import Page from "components/Page";

// components
import Tabs from "@/components/_dashboard/cloud/auth";

import { Icon } from "@iconify/react";
import Cloud from "@iconify/icons-ant-design/cloud-server";

// eslint-disable-next-line import/no-named-as-default
import checkRoles from "utils/checkRoles";

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
        title="TechnoNatura App - IOT API Cloud Service"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <Container maxWidth="xl">
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
                title={
                  <>
                    <Breadcrumbs aria-label="breadcrumb">
                      <NextLink href="/cloud">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                          underline="hover"
                          sx={{ display: "flex", alignItems: "center" }}
                          color="inherit"
                          href="#"
                        >
                          <Icon icon={Cloud} style={{ marginRight: 5 }} /> Cloud
                          Service
                        </Link>
                      </NextLink>

                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                        color="text.primary"
                      >
                        {/* <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
                        Auth API
                      </Typography>
                    </Breadcrumbs>
                    Welcome to TechnoNatura IoT Cloud Service.
                  </>
                }
                description="You can manage datas related to this dashboard ecosystems."
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              // @ts-ignore
              md={4}
            >
              <MainCard title="Docs" description="Visit our Docs for more." />
            </Grid>
          </Grid>
          <Box sx={{ pb: 5, marginTop: 3 }}>
            <Tabs />
          </Box>
        </Container>
      </Container>
    </>
  );
}
