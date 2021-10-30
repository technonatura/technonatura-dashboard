import { useState } from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useRouter } from "next/router";

// material
import { styled } from "@mui/material/styles";

import useUser from "hooks/useUser";
import NextLink from "next/link";
// material
import { Box, Button, Typography, Container, Link } from "@mui/material";
// components
import { MotionContainer } from "components/animate";
import Page from "components/Page";
import AuthLayout from "layouts/AuthLayout";

//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const LoadingRootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));
const LoadingStyle = styled(Page)(() => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
}));
const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// @ts-ignore
export default function DashboardLayout({ children }) {
  const authState = useSelector((state: RootStore) => state.user);

  // eslint-disable-next-line no-unused-vars
  const { user } = useUser();
  // console.log(user);
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  if (pathname === "/404") {
    return children;
  }

  if (authState.loading || !authState.me) {
    if (!authState.me && (pathname === "/_error" || pathname === "/404")) {
      return children;
    }

    if (
      !authState.me &&
      !authState.loading &&
      (pathname === "/login" || pathname === "/register")
    ) {
      return children;
    }
    return (
      <LoadingRootStyle>
        <AuthLayout>TechnoNatura Dashboard</AuthLayout>

        <Container maxWidth="sm">
          <ContentStyle>
            <LoadingStyle
              // @ts-ignore
              title="TechnoNatura Dashboard"
            >
              <Container>
                <MotionContainer initial="initial" open>
                  <Box
                    sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}
                  >
                    <div>
                      <Typography variant="h3" paragraph>
                        TechnoNatura Dashboard
                      </Typography>
                    </div>
                    <Typography
                      sx={{ color: "text.secondary", marginBottom: 4 }}
                    >
                      Please wait the website to load, we are preparing amazing
                      experience for you! (This might takes a few seconds to
                      load)
                    </Typography>
                    <NextLink href="https://technonatura.vercel.app">
                      <Button size="large" variant="contained">
                        TechnoNatura Website
                      </Button>
                    </NextLink>

                    <NextLink href="https://status.technonatura.vercel.app">
                      <Button
                        sx={{ marginLeft: 2 }}
                        size="large"
                        variant="contained"
                      >
                        Server Status
                      </Button>
                    </NextLink>
                  </Box>
                </MotionContainer>
              </Container>
            </LoadingStyle>
          </ContentStyle>
        </Container>
      </LoadingRootStyle>
    );
  }

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/_error" ||
    pathname === "/404" ||
    pathname === "/forgot-password" ||
    pathname === "/project/create" ||
    pathname === "/project/view/[projectName]"
  ) {
    return children;
  }

  return (
    <>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar
          isOpenSidebar={open}
          onCloseSidebar={() => setOpen(false)}
        />
        <MainStyle>{children}</MainStyle>
      </RootStyle>
    </>
  );
}
