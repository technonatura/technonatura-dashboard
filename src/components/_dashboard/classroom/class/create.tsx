import * as React from "react";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// material
import {
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  Autocomplete,
  Box,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// material
import { Button, Select } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import checkRoles from "@utils/checkRoles";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateRange } from "@mui/lab/DateRangePicker";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

import CreateClassrom from "utils/api/CreateClassroom";

const createBranchSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  desc: Yup.string()
    .min(4, "Too Short!")
    .max(100, "Too Long!")
    .required("Description is required"),
  thumbnail: Yup.string()
    .min(4, "Too Short!")
    .required("Thumbnail is required"),
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]*$/,
      "Only letters, numbers, underscores, dashes, and periods are allowed."
    )
    .min(1, "Too Short!")
    .max(50, "Too Long!")

    .required("name is required"),
  category: Yup.string().required("Category is required"),
  branchId: Yup.string().required("Branch is required"),
  gradePeriod: Yup.number().required("This input required"),
  grade: Yup.number().required("This input required"),
  from: Yup.number().required("This week required"),
  to: Yup.number().required("This input required"),
});

const grade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let year: number[] = [];

for (let i = new Date().getFullYear() - 6; i <= new Date().getFullYear(); i++) {
  year.push(i);
}

export default function CreateBranch({
  isOpen,
  handleCloseCreateBranch,
  fetchBranches,
  branches,
}: {
  isOpen: boolean;
  handleCloseCreateBranch: () => void;
  fetchBranches: () => Promise<void>;
  branches?: Array<{ title: string; name: string; active: boolean }>;
}) {
  const gradeOptions = grade.map((option) => {
    return {
      firstLetter:
        option <= 6 ? "MI" : option >= 6 && option <= 9 ? "MTS" : "MA",
      value: option,
    };
  });
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const authState = useSelector((state: RootStore) => state.user);

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      category: "",
      gradePeriod: new Date().getFullYear(),
      grade: 8,
      branchId: "",
      active: true,
      from: Date.now() - 1000 * 60 * 60 * 24 * new Date().getDay(),
      to: Date.now() + 1000 * 60 * 60 * 24 * (6 - new Date().getDay()),
      desc: "",
      thumbnail: "",
    },
    validationSchema: createBranchSchema,
    onSubmit: async (values) => {
      try {
        // @ts-ignore
        const CreatedClassroom = await CreateClassrom(values, authState.token);
        if (CreatedClassroom.status === "success") {
          alert(CreatedClassroom.message);
          handleCloseCreateBranch();
          fetchBranches();
        }
        if (CreatedClassroom.errors) {
          // @ts-ignore
          formik.setErrors(CreatedClassroom.errors);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  React.useEffect(() => {
    // const regex = /\s/i;
    const titleCopy = formik.values.title.replaceAll(" ", "-");
    formik.setFieldValue("name", titleCopy);
    console.log(formik.values.title);
  }, [formik.values.title]);

  //   const authState = useSelector((state: RootStore) => state.user);

  // eslint-disable-next-line no-unused-vars

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  return (
    <>
      <Dialog fullWidth open={isOpen} onClose={handleCloseCreateBranch}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>Create Classroom</DialogTitle>
            <DialogContent>
              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                label="Title"
                {...getFieldProps("title")}
                error={Boolean(
                  // @ts-ignore
                  touched["title"] && errors["title"]
                )}
                // @ts-ignore
                helperText={
                  /* eslint-disable */

                  errors["title"]

                  /* eslint-enable */
                }
                disabled={isSubmitting}
              />
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                fullWidth
                label="Name"
                {...getFieldProps("name")}
                error={Boolean(
                  // @ts-ignore
                  touched["name"] && errors["name"]
                )}
                // @ts-ignore
                helperText={
                  /* eslint-disable */
                  // @ts-ignore

                  errors["name"]

                  /* eslint-enable */
                }
                value={getFieldProps("title").value.replaceAll(" ", "-")}
                style={{ marginTop: 20 }}
                disabled={true}
              />
              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                label="Description"
                {...getFieldProps("desc")}
                error={Boolean(
                  // @ts-ignore
                  touched["desc"] && errors["desc"]
                )}
                // @ts-ignore
                helperText={
                  /* eslint-disable */

                  errors["desc"]

                  /* eslint-enable */
                }
                disabled={isSubmitting}
              />
              <TextField
                style={{ marginTop: 15 }}
                fullWidth
                label="Thumbnail, photo url"
                {...getFieldProps("thumbnail")}
                error={Boolean(
                  // @ts-ignore
                  touched["thumbnail"] && errors["thumbnail"]
                )}
                // @ts-ignore
                helperText={
                  /* eslint-disable */

                  errors["thumbnail"]

                  /* eslint-enable */
                }
                disabled={isSubmitting}
              />
              {authState.me &&
                checkRoles(authState.me.roles, ["admin"]) &&
                branches && (
                  <FormControl fullWidth style={{ marginTop: 20 }}>
                    <InputLabel id="branch">Cabang TechnoNatura</InputLabel>

                    <Select
                      {...getFieldProps("branchId")}
                      name="branchId"
                      fullWidth
                      label="Cabang TechnoNatura"
                      error={Boolean(errors.branchId)}
                    >
                      {/* @ts-ignore */}
                      {branches
                        .filter((branch) => branch.active)
                        .map((branch) => (
                          // @ts-ignore
                          <MenuItem key={branch._id} value={branch._id}>
                            {branch.title}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.branchId}</FormHelperText>
                  </FormControl>
                )}
              {/* @ts-ignore */}
              <Stack fullWidth sx={{ mt: 3 }} direction="row">
                {authState.me && checkRoles(authState.me.roles, ["admin"]) && (
                  <Autocomplete
                    id="grade"
                    options={gradeOptions}
                    groupBy={(option) => option.firstLetter}
                    // @ts-ignore
                    getOptionLabel={(option) => option.value}
                    sx={{ width: "100%" }}
                    value={{
                      // @ts-ignore
                      firstLetter: authState.me?.roleInTechnoNatura.teacher
                        ? // @ts-ignore
                          String(authState.me?.roleInTechnoNatura.grade)
                        : String(8),
                      // @ts-ignore
                      value: authState.me?.roleInTechnoNatura.teacher
                        ? // @ts-ignore
                          String(authState.me?.roleInTechnoNatura.grade)
                        : String(8),
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Grade"
                        error={Boolean(
                          // @ts-ignore
                          touched["grade"] && errors["grade"]
                        )}
                        // @ts-ignore
                        helperText={
                          /* eslint-disable */

                          errors["grade"]

                          /* eslint-enable */
                        }
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option.value}
                      </Box>
                    )}
                  />
                )}

                <Autocomplete
                  id="gradePeriod"
                  options={year}
                  value={values.gradePeriod}
                  // @ts-ignore
                  getOptionLabel={(option) => `${option} - ${option + 1}`}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grade Period"
                      error={Boolean(
                        // @ts-ignore
                        touched["gradePeriod"] && errors["gradePeriod"]
                      )}
                      // @ts-ignore
                      helperText={
                        /* eslint-disable */

                        errors["gradePeriod"]

                        /* eslint-enable */
                      }
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option} - {option + 1}
                    </Box>
                  )}
                />
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} mt={3} width="100%">
                  <MobileDateRangePicker
                    startText="Start Week"
                    value={[values.from, values.to]}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setFieldValue(
                        "from",
                        new Date(String(newValue[0])).getTime()
                      );
                      setFieldValue(
                        "to",
                        new Date(String(newValue[1])).getTime()
                      );
                    }}
                    minDate={2021}
                    showToolbar
                    todayText="d"
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField
                          fullWidth
                          {...startProps}
                          error={Boolean(
                            // @ts-ignore
                            touched["from"] && errors["from"]
                          )}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField
                          fullWidth
                          {...endProps}
                          error={Boolean(
                            // @ts-ignore
                            touched["from"] && errors["from"]
                          )}
                        />
                      </React.Fragment>
                    )}
                    toolbarTitle="Select Week"
                  />
                </Stack>
              </LocalizationProvider>

              <FormControl
                fullWidth
                sx={{ mt: 3 }}
                // @ts-ignore
                error={errors.category}
              >
                <InputLabel id="category">Kategori</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  {...getFieldProps("category")}
                  label="Kategori"
                  disabled={isSubmitting}
                  error={Boolean(errors.category)}
                >
                  <MenuItem value="art">Art</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="social">Social</MenuItem>
                  <MenuItem value="entrepreneur">Entrepreneur</MenuItem>
                </Select>
                <FormHelperText> {errors.category}</FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCreateBranch}>Cancel</Button>
              <LoadingButton
                sx={{ cursor: isSubmitting ? "not-allowed" : "cursor" }}
                loading={isSubmitting}
                variant="outlined"
                type="submit"
              >
                Create
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </>
  );
}
