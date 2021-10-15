import NextLink from "next/link";
// material
import { styled } from "@mui/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { RegisterForm } from "../components/authentication/register";

import { useRouter } from "next/router";

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

export default function Register() {
  const router = useRouter();

  if (
    router.query.app &&
    typeof router.query.app === "string" &&
    router.query.app === "tn-project"
  ) {
    router.push("/login/?app=tn-project");

    return "Authenticate you...";
  }

  return (
    <RootStyle
      // @ts-ignore
      title="Register | Minimal-UI"
    >
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={NextLink}
          href="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Register For TechnoNatura Social Account
          </Typography>
          <img
            alt="register"
            src="/static/illustrations/illustration_register.png"
          />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link
              href="/page/terms-of-service"
              underline="always"
              sx={{ color: "text.primary" }}
              target="_blank"
            >
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link
              href="/page/privacy-policy"
              underline="always"
              target="_blank"
              sx={{ color: "text.primary" }}
            >
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <Link href="/login" component={NextLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
