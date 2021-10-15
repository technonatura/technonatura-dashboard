import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { useRouter } from "next/router";

// material
import { styled } from "@mui/styles";
// material
import { Container, Box, Typography, Link, Breadcrumbs } from "@mui/material";

// components
import Page from "components/Page";

import { Icon } from "@iconify/react";
import Admin from "@iconify/icons-ic/outline-admin-panel-settings";

// eslint-disable-next-line import/no-named-as-default
import checkRoles from "utils/checkRoles";
import Users from "components/_dashboard/admin/user/index";
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
  if (authState.me && !checkRoles(authState.me?.roles, ["admin"])) {
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
            <NextLink href="/admin">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href="#"
              >
                <Icon icon={Admin} style={{ marginRight: 5 }} /> Admin
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
            Hello {authState.me?.fullName}, here are your users.
          </Typography>
          <Typography variant="h5" color="grayText">
            You can delete, and edit (if it really need) user(s).
          </Typography>
        </Box>
      </Container>
      {/* @ts-ignore */}
      <Users />
    </>
  );
}
