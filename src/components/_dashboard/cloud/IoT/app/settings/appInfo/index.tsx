import * as React from "react";

import { useRouter } from "next/router";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import axios from "axios";

// material
// import { styled } from "@mui/styles";
// material
import {
  Box,
  Tab,
  Card,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  LinearProgress,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import IoTCloudAppSensors from "./index";

// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

const AppInfoSchema = Yup.object().shape({
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
});

export default function RolesPage({
  name,
  desc,
  appToken,
  visibility,
}: {
  name: string;
  desc: string;
  visibility: "private" | "public";
  appToken: {
    token: string;
    tokenCreated: number;
  };
}) {
  const router = useRouter();
  const authState = useSelector((state: RootStore) => state.user);

  const [tab, setTab] = React.useState("apps");

  const formik = useFormik({
    initialValues: {
      name,
      desc,
      visibility,
    },
    validationSchema: AppInfoSchema,
    onSubmit: async (values) => {
      try {
        const modifiedApp = await axios.post<{
          message: string;
          status: "success" | "error" | "warning";
        }>(`${process.env.NEXT_PUBLIC_SERVER}/iot/edit`, {
          authToken: authState.token,
          ...values,
          iotAppId: router.query.appId,
        });

        alert(modifiedApp.data.message);

        if (modifiedApp.data.status === "success") {
          router.reload();
        }
      } catch (err) {
        console.log(err);
        alert("error has occured please check console to know about it");
      }
    },
  });

  const handleChange = (event: any, newValue: any) => {
    setTab(newValue);
  };

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <Card style={{ width: "100%", marginTop: "20px", padding: "20px" }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {" "}
            <Typography variant="h5" color="grayText">
              TechnoNatura Cloud App Info
            </Typography>
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
              label="Description"
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
              error={errors.visibility}
            >
              <InputLabel id="visibility">Visibilitas</InputLabel>
              <Select
                labelId="visibility"
                id="demo-simple-select"
                {...getFieldProps("visibility")}
                label="Visibilitas"
                disabled={isSubmitting}
              >
                <MenuItem value="public">Publik</MenuItem>
                <MenuItem value="private">Pribadi</MenuItem>
              </Select>
              <FormHelperText> {errors.visibility}</FormHelperText>
            </FormControl>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="contained"
              style={{ marginTop: "10px" }}
            >
              Edit
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Card>
      <Card
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "20px",
          cursor: "notAllowed",
        }}
      >
        <TextField
          // eslint-disable-next-line react/no-array-index-key
          fullWidth
          label="App Token"
          disabled
          value={appToken.token}
          helperText={String(new Date(appToken.tokenCreated))}
          style={{ cursor: "notAllowed" }}
        />
      </Card>
    </>
  );
}
