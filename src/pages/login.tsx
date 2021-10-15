import NextLink from "next/link";

// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";

import LanguagePopover from "layouts/dashboard/LanguagePopover";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { LoginForm } from "../components/authentication/login";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
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

// ----------------------------------------------------------------------

export default function Login() {
  const authState = useSelector((state: RootStore) => state.user);

  return (
    //   @ts-ignore
    <RootStyle title="Login | Minimal-UI">
      {!authState.me && (
        <AuthLayout>
          <p style={{ marginRight: 10, display: "inline-block" }}>
            Don’t have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              href="/register"
              component={NextLink}
            >
              Get started
            </Link>
          </p>

          {/* <LanguagePopover /> */}
        </AuthLayout>
      )}

      <MHidden width="mdDown">
        {!authState.me && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/static/illustrations/illustration_login.png"
              alt="login"
            />
          </SectionStyle>
        )}
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          {!authState.me && (
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to TechnoNatura Social Account
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Stack>
          )}

          <LoginForm />
          {!authState.me && (
            <MHidden width="smUp">
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?&nbsp;
                <Link variant="subtitle2" component={NextLink} href="/register">
                  Get started
                </Link>
              </Typography>
            </MHidden>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
