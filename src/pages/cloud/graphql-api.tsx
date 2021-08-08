import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import NextLink from "next/link";

// material
import {
  Container,
  Box,
  Typography,
  Link,
  Breadcrumbs,
} from "@material-ui/core";

import { Icon } from "@iconify/react";
import Cloud from "@iconify/icons-ant-design/cloud-server";

export default function RolesPage() {
  const authState = useSelector((state: RootStore) => state.user);

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <NextSeo
        title="TechnoNatura App - GraphQL API Cloud Service"
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
              GraphQL API
            </Typography>
          </Breadcrumbs>
        </div>
        <Box sx={{ pb: 5, marginTop: 3 }}>
          <Typography variant="h3">
            Hi {authState.me?.fullName}, welcome to GraphQL Cloud API
          </Typography>
          <Typography variant="h5" color="grayText">
            In this cloud service you can interact to our GraphQL API through UI
            (User Interface)
          </Typography>
        </Box>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        For security reason the server blocks from iframing, thus please visit{" "}
        <Link href="https://technonatura.herokuapp.com/graphql">
          https://technonatura.herokuapp.com/graphql
        </Link>{" "}
        to interact with our GraphQL Playground API
      </Container>
    </>
  );
}
