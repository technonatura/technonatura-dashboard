import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useRouter } from "next/router";

import axios from "axios";

import { NextSeo } from "next-seo";

// material
import { styled } from "@material-ui/core/styles";
// material
import { Container, Box, Typography, Divider, Grid } from "@material-ui/core";

// components
import Page from "components/Page";

import MainCard from "components/cards/main";

// components
import Tabs from "@/components/_dashboard/cloud/IoT/sensor/Tabs";

// material
import {
  Card,
  CardContent,
  Stack,
  Button,
  Link,
  CircularProgress,
} from "@material-ui/core";

import Label from "components/Label";

import {
  IoTAppInterface,
  sensorInterfaceI,
} from "@/types/models/IoT/IoTApp.model";
import checkMeInTeammates from "@utils/checkTeammate";
// import

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function RolesPage() {
  const [IoTApp, setIoTApp] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    app?: IoTAppInterface;
    sensor?: sensorInterfaceI;
  }>({ fetched: false, message: "", status: "" });
  const [openCreateBranch, setOpenCrateBranch] = React.useState(false);

  const authState = useSelector((state: RootStore) => state.user);
  const router = useRouter();

  const handleClickOpenCreateBranch = () => {
    setOpenCrateBranch(true);
  };

  const handleCloseCreateBranch = () => {
    setOpenCrateBranch(false);
  };

  React.useEffect(() => {
    if (router.query.sensorId && !IoTApp.fetched && !IoTApp.app) {
      fetchIoTApp();
    }
  }, [router.query.sensorId]);

  async function fetchIoTApp() {
    try {
      // eslint-disable-next-line no-shadow
      const IoTApp = await axios.post<{
        message: string;
        status: string;
        app: IoTAppInterface;
        sensor: sensorInterfaceI;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/iot/sensor`, {
        authToken: authState.token,
        sensorId: router.query.sensorId,
      });
      setIoTApp({
        fetched: true,
        message: "Success Fethed Stories",
        status: "success",
        app: IoTApp.data.app,
        sensor: IoTApp.data.sensor,
      });
    } catch (err) {
      // console.error(err);
      setIoTApp({
        fetched: true,
        message: "error on server",
        status: "error",
      });
    }
  }

  if (authState.me && !authState.me.isAccountVerified) {
    return (
      <>
        <NextSeo
          title="TechnoNatura App - 404 BLOCKED"
          description="The TechnoNatura Social Media and Dashboard"
          canonical="https://dashboard.technonatura.vercel.app"
        />
        <RootStyle
          // @ts-ignore
          title="404 Page Not Found "
        >
          <Container>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <div>
                <Typography variant="h3" paragraph>
                  Only Verified User Have an Access To This Cloud Service.
                </Typography>
              </div>
              <Typography sx={{ mt: 3, color: "text.secondary" }}>
                We are sorry you do not have an access to this page :(
              </Typography>
            </Box>
          </Container>
        </RootStyle>
      </>
    );
  }

  if (!IoTApp.fetched) {
    return (
      <>
        <NextSeo
          title="Fetching IoT Cloud App.."
          description="The TechnoNatura Social Media and Dashboard"
          canonical="https://app.technonatura.vercel.app/cloud/iot/"
        />
        <RootStyle
          // @ts-ignore
          title="404 Page Not Found "
        >
          <Container>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <CircularProgress />
              <Typography sx={{ mt: 3, color: "text.secondary" }}>
                Tolong tunggu, kami sedang mengambil informasi mengenai Sensor
                ini (selesai dalam beberapa detik, tergantung kecepatan
                Internet.).
              </Typography>
            </Box>
          </Container>
        </RootStyle>
      </>
    );
  }

  if (
    IoTApp.sensor &&
    authState.me &&
    IoTApp.app &&
    (IoTApp.app.visibility === "public" ||
      (IoTApp.app.visibility === "private" &&
        checkMeInTeammates(IoTApp.app.team, authState.me._id, [
          "owner",
          "admin",
          "viewer",
        ]))) &&
    !checkMeInTeammates(IoTApp.app.team, authState.me._id, ["blocked"])
  ) {
    // eslint-disable-next-line no-unused-vars
    return (
      <>
        <NextSeo
          title={`${IoTApp.sensor?.name} - TechnoNatura IoT Cloud Service`}
          description="The TechnoNatura Social Media and Dashboard"
          canonical="https://app.technonatura.vercel.app/cloud/iot"
        />
        <Container maxWidth="xl">
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={6}
                // @ts-ignore
                md={8}
              >
                <MainCard
                  title={`${IoTApp.sensor?.name} - ${IoTApp.app.name} IoT Cloud App`}
                  description={IoTApp.sensor?.desc}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                // @ts-ignore
                md={4}
              >
                <MainCard
                  title="Help Centre"
                  description="Visit our Story HC for more."
                />
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="xl">
            <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
              <Tabs sensor={IoTApp.sensor} app={IoTApp.app} />
            </Box>
          </Container>
          <Divider />
        </Container>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title="TechnoNatura IoT Cloud Service - 404 APP NOT FOUND"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <RootStyle
        // @ts-ignore
        title="404 Page Not Found "
      >
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <div>
              <Typography variant="h3" paragraph>
                404 App Not Found :(
              </Typography>
            </div>
            <Typography sx={{ mt: 3, color: "text.secondary" }}>
              Kami tidak menemukan aplikasi yang anda cari, maaf atas ketidak
              nyamanannya.
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </>
  );
}
