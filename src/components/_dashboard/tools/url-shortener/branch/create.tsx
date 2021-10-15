import * as React from "react";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

import axios from "axios";

// material
// import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// material
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const createBranchSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  name: Yup.string()
    .matches(
      /^[A-Za-z0-9_-]*$/,
      "Only letters, numbers, underscores, and dashes are allowed."
    )
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .required("name is required"),
});

export default function CreateBranch({
  isOpen,
  handleCloseCreateBranch,
  fetchBranches,
}: {
  isOpen: boolean;
  handleCloseCreateBranch: () => void;
  fetchBranches: () => Promise<void>;
}) {
  const authState = useSelector((state: RootStore) => state.user);

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
    },
    validationSchema: createBranchSchema,
    onSubmit: async (values) => {
      try {
        const CreatedBranch = await axios.post<{
          message: string;
          status: string;
          branch?: { title: string; name: string };
          errors: { title: string; name: string };
        }>(`${process.env.NEXT_PUBLIC_SERVER}/branch/add`, {
          authToken: authState.token,
          ...values,
        });

        if (CreatedBranch.data.status === "success") {
          alert(CreatedBranch.data.message);
          handleCloseCreateBranch();
          fetchBranches();
        }

        if (CreatedBranch.data.errors) {
          formik.setErrors(CreatedBranch.data.errors);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

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
                style={{ marginTop: 20 }}
                disabled={isSubmitting}
              />
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
