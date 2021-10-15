import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useRouter } from "next/router";

import axios from "axios";

import { NextSeo } from "next-seo";

// material
import { styled } from "@mui/material/styles";
// material
import { Container, Box, Typography, Divider, Grid } from "@mui/material";

// components
import Page from "components/Page";

import MainCard from "components/cards/main";

// components
import Tabs from "@/components/_dashboard/cloud/IoT/app/Tabs";

// material
import {
  Card,
  CardContent,
  Stack,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";

import Label from "components/Label";

import { useDispatch } from "react-redux";
import { IoTCSSuccess } from "global/actions/IoTCloudServiceApp.action";

import { IoTAppInterface } from "@/types/models/IoT/IoTApp.model";
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
  }>({ fetched: false, message: "", status: "" });

  const authState = useSelector((state: RootStore) => state.user);
  const IoTState = useSelector((state: RootStore) => state.iotApp);

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (router.query.appId && !IoTState.fetched && !IoTState.app) {
      fetchIoTApp();
    }
  }, [router.query.appId]);

  async function fetchIoTApp() {
    try {
      // eslint-disable-next-line no-shadow
      const IoTApp = await axios.post<{
        message: string;
        status: string;
        app: IoTAppInterface;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/iot/app`, {
        authToken: authState.token,
        iotAppId: router.query.appId,
      });
      dispatch(IoTCSSuccess(IoTApp.data.app));
      setIoTApp({
        fetched: true,
        message: "Success Fetched Stories",
        status: "success",
        app: IoTApp.data.app,
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

  if (IoTState.loading) {
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
                Tolong tunggu, kami sedang mengambil informasi mengenai App ini
                (selesai dalam beberapa detik, tergantung kecepatan Internet.).
              </Typography>
            </Box>
          </Container>
        </RootStyle>
      </>
    );
  }

  if (
    authState.me &&
    IoTState.app &&
    (IoTState.app.visibility === "public" ||
      (IoTState.app.visibility === "private" &&
        checkMeInTeammates(IoTState.app.team, authState.me._id, [
          "owner",
          "admin",
          "viewer",
        ]))) &&
    !checkMeInTeammates(IoTState.app.team, authState.me._id, ["blocked"])
  ) {
    // eslint-disable-next-line no-unused-vars
    return (
      <>
        <NextSeo
          title={`${IoTState.app.name} - TechnoNatura IoT Cloud Service`}
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
                  title={`${IoTState.app.name} IoT Cloud App`}
                  description={IoTState.app.desc}
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
              <Tabs app={IoTState.app} />
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
