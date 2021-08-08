import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
// import NextLink from "next/link";

// material
import { styled } from "@material-ui/core/styles";
// material
import { Container, Box, Typography } from "@material-ui/core";

// components
import Page from "components/Page";
import CreateStory from "components/_dashboard/story/Create";

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
          <Typography variant="h3">Create Story</Typography>
          <Typography variant="h5" color="grayText">
            Create story and post it to Internet!
          </Typography>
        </Box>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <CreateStory />
        </Box>
      </Container>
    </>
  );
}
