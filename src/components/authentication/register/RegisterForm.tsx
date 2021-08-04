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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";

// eslint-disable-next-line import/no-cycle
import SubmitButton from "./SubmitButton";
import ChooseRoleInTechnoNatura from "./ChooseRoleInTechnoNatura";

// ----------------------------------------------------------------------

export const FormSteps: Array<{
  label: string;
  // eslint-disable-next-line camelcase
  label_desc: string;
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
    label_desc: "We need this to indentify who you are",
    step: 0,
    inputs: [
      { label: "Full Name", input_name: "fullName", show: true },
      { label: "Username", input_name: "username", show: true },
      { label: "Birth Day", input_name: "birthDay", show: false },
    ],
  },
  {
    label: "Gender",
    label_desc: "We keep this data secure.",

    step: 1,
    inputs: [{ label: "Gender", input_name: "gender", show: false }],
  },
  {
    label: "Role in TechnoNatura",
    label_desc: "What is your current role in TechnoNatura?",

    step: 2,
    inputs: [
      { label: "Role", input_name: "roleInTechnoNatura", show: false },
      { label: "level", input_name: "level", show: false },
      { label: "startPeriod", input_name: "startPeriod", show: false },
    ],
  },
  {
    label: "Privacy Info",
    label_desc: "We keep this data secure.",

    step: 3,
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
    .matches(
      /^[A-Za-z0-9_-]*$/,
      "Only letters, numbers, underscores, and dashes are allowed."
    )
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .required("username required"),

  gender: Yup.string().min(1, "Too Short!").required("username required"),
  roleInTechnoNatura: Yup.string()
    .min(5, "Too Short!")
    .required("username required"),

  startPeriod: Yup.number()
    .min(1990, "Should be greater than 2000")
    .required("Start period required"),

  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  birthDay: Yup.string().required("Please Fill Your Birth Day"),

  gradeInNumber: Yup.number()
    .min(1, "There is no grade below 1!")
    .max(12, "This is not university!")
    .required("What is the grade?"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setStep] = useState<number>(0);

  function previousStep() {
    if (currentStep !== 0) {
      setStep(currentStep - 1);
      console.log("currentStep", currentStep);
    }
  }

  function nextStep() {
    if (currentStep !== FormSteps.length) {
      setStep(currentStep + 1);
      console.log("currentStep", currentStep);
    }
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      roleInTechnoNatura: "",
      startPeriod: 2020,
      dream: "",
      hobbies: [],
      birthDay: "",

      gradeInNumber: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // navigate('/dashboard', { replace: true });
      console.log(formik, process.env.NODE_ENV);

      // nextStep();
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
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
                {/* <Box sx={{ mb: 0 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    {label} - {currentStep + 1} / {FormSteps.length}
                  </Typography>
                </Box> */}

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
              <DatePicker
                label="Birth Day"
                value={getFieldProps("birthDay").value}
                onChange={(date) => {
                  formik.setFieldValue("birthDay", date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              {errors.birthDay && (
                <Typography color="red">{errors.birthDay}</Typography>
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

          {currentStep === 2 && <ChooseRoleInTechnoNatura formik={formik} />}

          {currentStep === 3 && (
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
