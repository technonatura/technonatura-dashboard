import * as React from "react";

import axios from "axios";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { useFormik, Form, FormikProvider } from "formik";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

// material
import { styled } from "@mui/styles";
// material
import {
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CircularProgress from "@mui/material/CircularProgress";

import { RegisterUserForm } from "@/types/models/RegisterUserForm.model";

import RegisterUser from "utils/registerUser";
import { UserSignUpLoginSuccess } from "global/actions/auth";

import ms from "ms";

// components
import Page from "components/Page";

// eslint-disable-next-line import/no-cycle
import SubmitButton from "./SubmitButton";
import ChooseRoleInTechnoNatura from "./ChooseRoleInTechnoNatura";
import FormSteps from "./FormSteps";
import RegisterSchema from "./RegisterSchema";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function RegisterForm() {
  const router = useRouter();
  const [Branches, setBranches] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    branches?: Array<{ title: string; name: string; active: boolean }>;
  }>({ fetched: false, message: "", status: "" });

  const [, setAuthCookie] = useCookies([
    process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
  ]);

  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.user);

  React.useEffect(() => {
    fetchBranches();
  }, []);

  async function fetchBranches() {
    try {
      // eslint-disable-next-line no-shadow
      const storiesRes = await axios.get<{
        message: string;
        status: string;
        branches?: Array<{ title: string; name: string; active: boolean }>;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/api/branches`);
      setBranches({
        fetched: true,
        message: "Success Fethed Stories",
        status: "success",
        branches: storiesRes.data.branches,
      });
    } catch (err) {
      // console.error(err);
      setBranches({
        fetched: true,
        message: "error on server",
        status: "error",
      });
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setStep] = useState<number>(0);
  const formik = useFormik<RegisterUserForm>({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      gender: undefined,
      roleInTechnoNatura: "student",

      startPeiod: 2020,

      // @ts-ignore
      birthDate: Date.now() - 1000 * 60 * 60 * 24 * 365 * 4,

      gradeInNumber: 7,
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      // navigate('/dashboard', { replace: true });
      let goToStep = -1;
      const registerUser = await RegisterUser(formik.values);

      // console.log(registerUser);
      if (registerUser.status === "success") {
        dispatch(UserSignUpLoginSuccess(registerUser.user, registerUser.token));
        setAuthCookie(
          process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
          registerUser.token,
          { path: "/", maxAge: ms("1y") }
        );

        if (
          router.query.app &&
          typeof router.query.app === "string" &&
          router.query.app === "tn-project"
        ) {
          router.push("/login/?app=tn-project");

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
      } else {
        if (registerUser.errors) {
          formik.setErrors(registerUser.errors);
        }
        // console.log(goToStep, formik.validateField('username'));
        // eslint-disable-next-line no-restricted-syntax
        for (const error in registerUser.errors) {
          if (goToStep === -1) {
            for (let i = 0; i <= FormSteps.length; i += 1) {
              const found = FormSteps[i].inputs.findIndex(
                (input) => String(input.input_name) === String(error)
              );

              if (found > -1) {
                goToStep = i;
                break;
              }
            }
            // @ts-ignore
            // goToStep = where?.step;
            console.log(goToStep, error);
            // @ts-ignore
            console.log(setStep(goToStep));
          }
        }
        // nextStep();
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  function previousStep() {
    if (currentStep !== 0) {
      setStep(currentStep - 1);
      console.log("currentStep", currentStep);
    }
  }

  function nextStep() {
    if (currentStep !== FormSteps.length) {
      setStep(currentStep + 1);
    }
  }

  if (!Branches) {
    return (
      <RootStyle
        // @ts-ignore
        title="Loading..."
      >
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <div>
              <CircularProgress />
            </div>
            <Typography sx={{ mt: 3, color: "text.secondary" }}>
              Harap menunggu komponen halaman ini untuk terender. (Ini dapat
              memakan beberapa detik tergantung pada Koneksi Internet)
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    );
  }
  if (authState.me) {
    return (
      <RootStyle
        // @ts-ignore
        title="Success Created Account! "
      >
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <div>
              <Typography variant="h3" paragraph>
                Successfully created account!
              </Typography>
            </div>
            <Typography sx={{ mt: 3, color: "text.secondary" }}>
              Congrats you successfully created TechnoNatura! The next step you
              need is to get account verification to access many features from
              this dashboard!
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
          {/* eslint-disable-next-line arrow-body-style */}
          {/* eslint-disable-next-line camelcase */}
          {FormSteps.map(({ step, inputs, label, label_desc }) => {
            if (step !== currentStep) {
              return "";
            }

            // eslint-disable-next-line consistent-return
            return (
              <>
                <Box sx={{ mb: 1 }} key={step}>
                  <Typography variant="h4" gutterBottom>
                    {label}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {/* eslint-disable-next-line camelcase */}
                    {label_desc}
                  </Typography>
                </Box>

                {inputs.map(
                  (
                    {
                      // eslint-disable-next-line no-shadow
                      label,
                      // eslint-disable-next-line camelcase
                      input_name,
                      show,
                      helperText,
                    },
                    id
                  ) => {
                    if (!show) {
                      return "";
                    }
                    return (
                      <TextField
                        // eslint-disable-next-line react/no-array-index-key
                        key={id}
                        fullWidth
                        label={label}
                        {...getFieldProps(input_name)}
                        error={Boolean(
                          // @ts-ignore
                          touched[input_name] && errors[input_name]
                        )}
                        // @ts-ignore
                        helperText={
                          /* eslint-disable */
                          // @ts-ignore
                          touched[input_name]
                            ? // @ts-ignore
                              errors[input_name]
                              ? // @ts-ignore
                                errors[input_name]
                              : helperText && helperText
                            : helperText && helperText
                          /* eslint-enable */
                        }
                      />
                    );
                  }
                )}
              </>
            );
          })}

          {currentStep === 0 && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* @ts-ignore */}
              <DateTimePicker
                label="Birth Day"
                value={getFieldProps("birthDate").value}
                onChange={(date) => {
                  formik.setFieldValue("birthDate", date);
                }}
                maxDateTime={Date.now() - 1000 * 60 * 60 * 24 * 365 * 4}
                renderInput={(params) => <TextField {...params} />}
              />

              {errors.birthDate && (
                <Typography color="red">{errors.birthDate}</Typography>
              )}
            </LocalizationProvider>
          )}

          {currentStep === 1 && (
            // @ts-ignore
            <FormControl
              component="fieldset"
              error={Boolean(errors.gender)}
              helperText={errors.gender}
              {...getFieldProps("gender")}
            >
              <FormLabel component="legend">Gender *</FormLabel>
              <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  checked={getFieldProps("gender").value === "female"}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  checked={getFieldProps("gender").value === "male"}
                />
              </RadioGroup>
            </FormControl>
          )}

          {currentStep === 2 && (
            <ChooseRoleInTechnoNatura formik={formik} Branches={Branches} />
          )}

          {currentStep === 3 && (
            <>
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password*"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={
                  errors.password
                    ? errors.password
                    : "The password is saved encryptedly"
                }
              />
            </>
          )}
          {/* eslint-disable-next-line no-nested-ternary */}
          {!isSubmitting && currentStep > 0 ? (
            currentStep !== FormSteps.length ? (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <SubmitButton
                  goBack
                  formik={formik}
                  currentStep={currentStep}
                  isSubmitting={isSubmitting}
                  nextStep={nextStep}
                  previousStep={previousStep}
                  steps={FormSteps.length}
                />

                <SubmitButton
                  goBack={false}
                  formik={formik}
                  currentStep={currentStep}
                  isSubmitting={isSubmitting}
                  nextStep={nextStep}
                  previousStep={previousStep}
                  steps={FormSteps.length}
                />
              </Stack>
            ) : (
              <>
                <Box sx={{ mb: 0 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    Is that all?
                  </Typography>
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <SubmitButton
                    goBack
                    formik={formik}
                    currentStep={currentStep}
                    isSubmitting={isSubmitting}
                    nextStep={nextStep}
                    previousStep={previousStep}
                    steps={FormSteps.length}
                  />

                  <SubmitButton
                    goBack={false}
                    formik={formik}
                    currentStep={currentStep}
                    isSubmitting={isSubmitting}
                    nextStep={nextStep}
                    previousStep={previousStep}
                    steps={FormSteps.length}
                  />
                </Stack>
              </>
            )
          ) : (
            <SubmitButton
              goBack={false}
              formik={formik}
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              nextStep={nextStep}
              previousStep={previousStep}
              steps={FormSteps.length}
            />
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
