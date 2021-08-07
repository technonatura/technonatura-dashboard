import React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { Box, Grid, Container, Typography } from "@material-ui/core";
// import { AppWeeklySales } from "components/_dashboard/app";

import {
  HelpCentreCard,
  CloudCard,
  BlogCard,
} from "components/_dashboard/admin/main/index";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

function Home() {
  const authState = useSelector((state: RootStore) => state.user);

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 5 }}>
        <Typography variant="h3">
          Hi, Welcome back {authState.me?.fullName}
        </Typography>
        <Typography variant="h5" color="grayText">
          Discover the great TechnoNatura Dashboard, write a post, and show your
          cool school project to Internet!
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={5}
          // @ts-ignore
          md={3}
        >
          <HelpCentreCard />
        </Grid>

        <Grid
          item
          xs={12}
          sm={5}
          // @ts-ignore
          md={3}
        >
          <BlogCard />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          // @ts-ignore
          md={3}
        >
          <CloudCard />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          // @ts-ignore
          md={3}
        >
          <HelpCentreCard />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <AppNewUsers />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppItemOrders />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBugReports />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppConversionRates />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentSubject />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppNewsUpdate />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTrafficBySite />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppTasks />
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default Home;
