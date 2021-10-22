import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
// import NextLink from "next/link";

// material
import { styled } from "@mui/material/styles";
// material
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components
import Page from "components/Page";
import CreateStory from "components/_dashboard/project/Create";

import checkRoles from "@utils/checkRoles";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function RolesPage() {
  const router = useRouter();
  const authState = useSelector((state: RootStore) => state.user);

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  if (authState.me && !authState.me.isAccountVerified) {
    router.push("/");
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
                  Only Verified User Have an Access To This Cloud Service.
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
        title="TechnoNatura App - IOT API Cloud Service"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, marginTop: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3">Create Project</Typography>
            <LoadingButton variant="contained">Save</LoadingButton>
          </Stack>
          <Typography variant="h5" color="grayText">
            Create project and post it to Internet!
          </Typography>
        </Box>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <CreateStory />
        </Box>
      </Container>
    </>
  );
}
