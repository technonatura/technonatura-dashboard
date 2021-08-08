// import { useSelector } from "react-redux";
// import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";

// material
import { Container, Grid } from "@material-ui/core";

import {
  HelpCentreCard,
  WelcomeCard,
} from "@/components/_dashboard/cloud/main/index";

export default function RolesPage() {
  //   const authState = useSelector((state: RootStore) => state.user);

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <NextSeo
        title="TechnoNatura App - GraphQL API Cloud Service"
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
        </Grid>
      </Container>
    </>
  );
}
