import * as React from "react";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

import axios from "axios";

// material
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Autocomplete,
  Box,
  Stack,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// material
import { Button } from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import checkRoles from "@utils/checkRoles";

const createBranchSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
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
  const authState = useSelector((state: RootStore) => state.user);

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      category: "",
      gradePeriod: "",
      grade: "",
      branch: "",
    },
    validationSchema: createBranchSchema,
    onSubmit: async (values) => {
      // try {
      //   const CreatedBranch = await axios.post<{
      //     message: string;
      //     status: string;
      //     branch?: { title: string; name: string };
      //     errors: { title: string; name: string };
      //   }>(`${process.env.NEXT_PUBLIC_SERVER}/branch/add`, {
      //     authToken: authState.token,
      //     ...values,
      //   });
      //   if (CreatedBranch.data.status === "success") {
      //     alert(CreatedBranch.data.message);
      //     handleCloseCreateBranch();
      //     fetchBranches();
      //   }
      //   if (CreatedBranch.data.errors) {
      //     formik.setErrors(CreatedBranch.data.errors);
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Dialog fullWidth open={isOpen} onClose={handleCloseCreateBranch}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>Create Branch</DialogTitle>
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
              {authState.me &&
                checkRoles(authState.me.roles, ["admin"]) &&
                branches && (
                  <Autocomplete
                    options={branches}
                    // @ts-ignore
                    getOptionLabel={(option) => option.id}
                    sx={{ width: "100%", marginTop: "20px" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Branch" />
                    )}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option.title}
                      </Box>
                    )}
                  />
                )}
              {/* @ts-ignore */}
              <Stack fullWidth sx={{ mt: 3 }} direction="row">
                {authState.me && checkRoles(authState.me.roles, ["admin"]) && (
                  <Autocomplete
                    options={grade}
                    // @ts-ignore
                    getOptionLabel={(option) => option}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Grade" />
                    )}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option}
                      </Box>
                    )}
                  />
                )}

                <Autocomplete
                  id="gradePeriod"
                  options={year}
                  // @ts-ignore
                  getOptionLabel={(option) => option}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Grade Period" />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option}
                    </Box>
                  )}
                />
              </Stack>
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
