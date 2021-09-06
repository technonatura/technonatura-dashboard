import * as React from "react";

import { useRouter } from "next/router";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  LinearProgress,
  Box,
} from "@material-ui/core/";

// material
import LoadingButton from "@material-ui/lab/LoadingButton";

import fetchUsers from "@utils/api/getStudents";
import RegisterIotCloudApp from "@utils/api/CreateIoTCloudApp";

const createBranchSchema = Yup.object().shape({
  visibility: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Visibilitas diperlukan!"),
  name: Yup.string()
    .matches(
      /^[A-Za-z0-9_-]*$/,
      "Hanya huruf, angka, garis bawah, dan tanda hubung yang diperbolehkan."
    )
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("nama diperlukan!"),

  desc: Yup.string()
    .min(4, "Too Short!")
    .max(100, "Too Long!")
    .required("Desc diperlukan!"),
  isTeam: Yup.boolean().required("Input ini diperlukan!"),
  team: Yup.array().when("isTeam", {
    is: true,
    then: Yup.array().required("Tolong tentukan anggota tim mu."),
  }),
});

interface UserI {
  avatar: string;
  id: string;
  isAccountVerified: boolean;
  name: string;
  roleInTechnoNatura: string;
  startPeriod: number;
  username: string;
}

export default function CreateIoTCloudApp({
  isOpen,
  handleCloseCreateBranch,
}: {
  isOpen: boolean;
  handleCloseCreateBranch: () => void;
}) {
  const router = useRouter();
  const [users, setUsers] = React.useState<{ users: UserI[] } | undefined>();
  const authState = useSelector((state: RootStore) => state.user);

  React.useEffect(() => {
    if (!users?.users) fetchUsers(setUsers, true);
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      visibility: "",
      desc: "",
      isTeam: false,
      team: [],
    },
    validationSchema: createBranchSchema,
    onSubmit: async (values) => {
      try {
        const registeredApp = await RegisterIotCloudApp(
          values,
          authState.token
        );
        if (registeredApp.errors) {
          formik.setErrors(registeredApp.errors);
        }
        if (registeredApp.AppId) {
          router.push(`/cloud/iot/${registeredApp.AppId}`);
        }
      } catch (err) {
        alert("Error has occured, please check console to know about it.");
      }
    },
  });

  //   const authState = useSelector((state: RootStore) => state.user);

  // eslint-disable-next-line no-unused-vars

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        onClose={handleCloseCreateBranch}
        scroll="body"
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>Create Auth App</DialogTitle>
            <DialogContent>
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                fullWidth
                label="Name"
                {...getFieldProps("name")}
                error={Boolean(errors.name)}
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
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                fullWidth
                label="Deskripsi"
                {...getFieldProps("desc")}
                error={Boolean(touched.desc && errors.desc)}
                // @ts-ignore
                helperText={
                  /* eslint-disable */
                  // @ts-ignore

                  errors["desc"]

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
