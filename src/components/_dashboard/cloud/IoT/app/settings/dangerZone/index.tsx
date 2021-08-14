import * as React from "react";

// import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

// material
// import { styled } from "@material-ui/core/styles";
// material
import {
  Box,
  Tab,
  Card,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import WarningIcon from "@material-ui/icons/Warning";

import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

import { TeammateInterface } from "types/models/IoT/IoTApp.model";
import CheckTeammate from "utils/checkTeammate";

import IoTCloudAppSensors from "./index";
import { values } from "lodash";
import axios from "axios";
import { LoadingButton } from "@material-ui/lab";
// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

export default function RolesPage({
  name,
  teammate,
}: {
  name: string;
  teammate: TeammateInterface[];
}) {
  const router = useRouter();
  const authState = useSelector((state: RootStore) => state.user);

  const AppInfoSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-z0-9_-]*$/,
        "Hanya huruf, angka, garis bawah, dan tanda hubung yang diperbolehkan."
      )
      .min(4, "Too Short!")
      .max(20, "Too Long!")
      .required("nama diperlukan!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: AppInfoSchema,
    onSubmit: async (values) => {
      try {
        const deletedApp = await axios.post<{
          message: string;
          status: "success" | "warning" | "error";
        }>(`${process.env.NEXT_PUBLIC_SERVER}/iot/del/${router.query.appId}`, {
          authToken: authState.token,
        });
        console.log(deletedApp);
        alert(deletedApp.data.message);
        if (deletedApp.data.status === "success") {
          router.push("/cloud/iot");
        }
      } catch (err) {
        console.log(err);
        alert("error occured please see console to know more about it.");
      }
    },
  });

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  if (
    !CheckTeammate(
      teammate,
      // @ts-ignore
      authState.me?._id,
      ["owner"]
    )
  ) {
    return "";
  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // eslint-disable-next-line no-unused-vars
  return (
    <Card style={{ width: "100%", marginTop: "20px", padding: "20px" }}>
      {" "}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h5" color="red">
            <WarningIcon />
            DANGER ZONE
          </Typography>
          <Typography
            // @ts-ignore
            variant="p"
            color="red"
          >
            Type your app name to delete your app
          </Typography>
          <TextField
            // eslint-disable-next-line react/no-array-index-key
            fullWidth
            label="Name"
            {...getFieldProps("name")}
            error={Boolean(errors.name) || getFieldProps("name").value !== name}
            placeholder={name}
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
          <Typography
            // @ts-ignore
            variant="p"
            color="red"
          >
            {getFieldProps("name").value !== name && "Invalid Name!"}
          </Typography>
          <LoadingButton
            style={{ marginTop: 10, display: "block" }}
            variant="contained"
            color="error"
            loading={isSubmitting}
            type="submit"
          >
            Delete Project
          </LoadingButton>
        </Form>
      </FormikProvider>
    </Card>
  );
}
