import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@material-ui/core";

// eslint-disable-next-line import/no-cycle
import SubmitButton from "./SubmitButton";

// ----------------------------------------------------------------------

export const FormSteps: Array<{
  label: string;
  step: number;
  // eslint-disable-next-line camelcase
  inputs: Array<{
    label: string;
    // eslint-disable-next-line camelcase
    input_name: string;
    InputProps?: Object;
    show: boolean;
    helperText?: string;
  }>;
}> = [
  {
    label: "Could you give us your basic personal information?",
    step: 0,
    inputs: [
      { label: "Full Name", input_name: "fullName", show: true },
      { label: "Username", input_name: "username", show: true },
    ],
  },
  {
    label: "Privacy Info",
    step: 1,
    inputs: [
      {
        label: "Email",
        input_name: "email",
        show: true,
        helperText: "We need your email to serve reset password service",
      },
      { label: "Password", input_name: "password", show: false },
    ],
  },
];

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name required"),
  username: Yup.string()
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .required("username required"),
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setStep] = useState<number>(0);

  function previousStep() {
    if (currentStep !== 0) {
      setStep(currentStep - 1);
    }
  }

  function nextStep() {
    if (currentStep !== FormSteps.length) {
      setStep(currentStep + 1);
    }
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // navigate('/dashboard', { replace: true });
      nextStep();
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* eslint-disable-next-line arrow-body-style */}
          {FormSteps.map(({ step, inputs, label }) => {
            if (step !== currentStep) {
              return "";
            }

            // eslint-disable-next-line consistent-return
            return (
              <>
                <Box sx={{ mb: 0 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    {label} - {currentStep + 1} / {FormSteps.length}
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
          {currentStep === 1 && (
            <>
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
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
                />

                <SubmitButton
                  goBack={false}
                  formik={formik}
                  currentStep={currentStep}
                  isSubmitting={isSubmitting}
                  nextStep={nextStep}
                  previousStep={previousStep}
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
                  />

                  <SubmitButton
                    goBack={false}
                    formik={formik}
                    currentStep={currentStep}
                    isSubmitting={isSubmitting}
                    nextStep={nextStep}
                    previousStep={previousStep}
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
            />
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
