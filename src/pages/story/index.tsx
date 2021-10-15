import * as React from "react";

import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// material
import { Container, Grid } from "@mui/material";

// import { AppWeeklySales } from "components/_dashboard/app";

import MainCard from "components/cards/main";

export default function RolesPage() {
  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <NextSeo
        title="TechnoNatura App - Story"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={5}
            // @ts-ignore
            md={8}
          >
            <MainCard
              title="Welcome to Story Dashboard!"
              description="You can manage story through this page."
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
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
    </>
  );
}
