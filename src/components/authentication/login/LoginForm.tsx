import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import { useState } from "react";
import { useCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Container,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { styled } from "@material-ui/core/styles";
import toast from "react-hot-toast";

import Page from "components/Page";

import UserLoginFunc from "utils/userLogin";
import { UserSignUpLoginSuccess } from "global/actions/auth";

import ms from "ms";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function LoginForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const [error, setError] = useState<string>("");

  const [, setAuthCookie] = useCookies([
    process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
  ]);

  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const userLogin = await UserLoginFunc(formik.values);

      // @ts-ignore
      if (userLogin.errors) {
        setError("password or email is incorrect");
      } else {
        setError("");
      }

      if (userLogin.status === "success") {
        dispatch(UserSignUpLoginSuccess(userLogin.user, userLogin.token));
        toast.success("Login Success!");
        if (formik.values.remember) {
          setAuthCookie(
            process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
            userLogin.token,
            { path: "/", maxAge: ms("1y") }
          );
        }

        if (
          router.query.app &&
          typeof router.query.app === "string" &&
          router.query.app === "tn-project"
        ) {
          return;
        }
        if (
          router.query.to &&
          typeof router.query.to === "string" &&
          router.query.to.startsWith("/")
        ) {
          router.push(router.query.to);

          return;
        }
        router.push("/");
      }
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  if (authState.me && router.query.app === "tn-project") {
    return (
      <RootStyle
        // @ts-ignore
        title="404 Page Not Found "
      >
        <Container>
          <Box sx={{ width: 500, margin: "auto", textAlign: "center" }}>
            <div>
              <Typography variant="h3" paragraph>
                Login to TechnoNatura Project
              </Typography>
            </div>
            <Typography sx={{ mt: 3, color: "text.secondary" }}>
              Click login to continue using TechnoNatura Social Account to
              TechnoNatura Project
            </Typography>
            <form
              method="post"
              action="https://tn-project.vercel.app/api/login"
            >
              <input type="hidden" name="token" value={authState.token} />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5 }}
                // loading={submitting}
                // onClick={() => setSubmitting(true)}
              >
                Login
              </LoadingButton>
            </form>
          </Box>
        </Container>
      </RootStyle>
    );
  }

  if (authState.me) {
    return (
      <RootStyle
        // @ts-ignore
        title="404 Page Not Found "
      >
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <div>
              <Typography variant="h3" paragraph>
                Successfully Login
              </Typography>
            </div>
            <Typography sx={{ mt: 3, color: "text.secondary" }}>
              Please wait the web to move to another page.
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            // eslint-disable-next-line react/no-array-index-key
            fullWidth
            label="email"
            {...getFieldProps("email")}
            error={Boolean(
              // @ts-ignore
              touched.email && errors.email
            )}
            // @ts-ignore
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        {error && <Typography color="red">{error}</Typography>}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            component={NextLink}
            variant="subtitle2"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
