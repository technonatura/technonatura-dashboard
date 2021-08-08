import React from "react";

import { Grid, Container } from "@material-ui/core";
// import { AppWeeklySales } from "components/_dashboard/app";

import {
  HelpCentreCard,
  CloudCard,
  BlogCard,
  WelcomeCard,
} from "components/_dashboard/admin/main/index";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

function Home() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={5}
          // @ts-ignore
          md={8}
        >
          <WelcomeCard />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          // @ts-ignore
          md={4}
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
