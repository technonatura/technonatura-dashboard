import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import axios from "axios";

// material
import { styled } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Link,
} from "@material-ui/core";

import Label from "components/Label";

import { sensorInterfaceI } from "@/types/models/IoT/IoTApp.model";

import { useRouter } from "next/router";
// import

const HeaderStyled = styled(Stack)(({ theme }) => ({
  display: "flex",
  marginTop: 3,

  [theme.breakpoints.up("sm")]: {
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function RolesPage({
  sharedWithMe,
  sensor,
}: {
  sharedWithMe: boolean;
  sensor: sensorInterfaceI;
}) {
  const authState = useSelector((state: RootStore) => state.user);
  const router = useRouter();

  //   const authState = useSelector((state: RootStore) => state.user);

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <HeaderStyled>
        <Typography variant="h5" color="grayText">
          Data Sensor IoT Cloud App Mu {sharedWithMe && "- Shared with Me"}
        </Typography>
      </HeaderStyled>

      {sensor.datas && sensor.datas.length > 0 ? (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* @ts-ignore */}
            {sensor.datas.reverse().map((branch) => (
              <Grid
                key={branch.date}
                item
                xs={12}
                sm={5}
                // @ts-ignore
                md={4}
              >
                <Card>
                  <CardContent
                    sx={{ padding: "10px 15px", paddingTop: "20px" }}
                  >
                    <Typography variant="h5" component="div">
                      {/* eslint-disable-next-line no-underscore-dangle */}{" "}
                      {branch.data}{" "}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {String(new Date(branch.date))}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Typography sx={{ mt: 3, mb: 1.5 }} color="text.secondary">
          {sensor.datas?.length === 0 &&
            "Kamu belum mempunyai data sensor di IoT Cloud App."}
        </Typography>
      )}
    </>
  );
}
