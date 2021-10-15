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
} from "@mui/material/";

// material
import LoadingButton from "@mui/lab/LoadingButton";

import fetchUsers from "@utils/api/getStudents";
import CreateIoTCloudSensor from "@utils/api/CreateIoTCloudSensor";

const createBranchSchema = Yup.object().shape({
  dataType: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Visibilitas diperlukan!"),
  sensorName: Yup.string()
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
      sensorName: "",
      dataType: "",
      desc: "",
    },
    validationSchema: createBranchSchema,
    onSubmit: async (values) => {
      try {
        const registeredApp = await CreateIoTCloudSensor(
          // @ts-ignore
          values,
          authState.token,
          router.query.appId
        );
        if (registeredApp.errors) {
          formik.setErrors(registeredApp.errors);
        }
        if (registeredApp.sensorId) {
          router.push(
            `/cloud/iot/${router.query.appId}/${registeredApp.sensorId}`
          );
        }
      } catch (err) {
        console.log("ERROR !", err);
        alert("Error has occured, please check console to know about it.");
      }
    },
  });

  //   const authState = useSelector((state: RootStore) => state.user);

  // eslint-disable-next-line no-unused-vars

  const { errors, handleSubmit, isSubmitting, getFieldProps } = formik;

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
            <DialogTitle>Create Sensor</DialogTitle>
            <DialogContent>
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                fullWidth
                label="Sensor Name"
                {...getFieldProps("sensorName")}
                error={Boolean(errors.sensorName)}
                // @ts-ignore
                helperText={
                  /* eslint-disable */
                  // @ts-ignore

                  errors["sensorName"]

                  /* eslint-enable */
                }
                style={{ marginTop: 20 }}
                disabled={isSubmitting}
              />
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                fullWidth
                label="Sensor Description"
                {...getFieldProps("desc")}
                error={Boolean(errors.desc)}
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

              <FormControl
                fullWidth
                sx={{ mt: 3 }}
                // @ts-ignore
                error={errors.dataType}
              >
                <InputLabel id="dataType">Data Type</InputLabel>
                <Select
                  labelId="dataType"
                  id="demo-simple-select"
                  {...getFieldProps("dataType")}
                  label="Visibilitas"
                  disabled={isSubmitting}
                >
                  <MenuItem value="boolean">Boolean</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                </Select>
                <FormHelperText> {errors.dataType}</FormHelperText>
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
