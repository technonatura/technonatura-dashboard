import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import axios from "axios";

// material
import { styled } from "@mui/styles";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Link,
} from "@mui/material";

import Label from "components/Label";

import { sensorInterfaceI } from "@/types/models/IoT/IoTApp.model";

import CreateBranchDialog from "./create";
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

export default function RolesPage({ sharedWithMe }: { sharedWithMe: boolean }) {
  const [IoTApps, setIoTApps] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    sensors?: Array<sensorInterfaceI>;
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
    fetchIoTApps();
  }, []);

  async function fetchIoTApps() {
    try {
      // eslint-disable-next-line no-shadow
      const IoTApp = await axios.post<{
        message: string;
        status: string;
        sensors?: Array<sensorInterfaceI>;
      }>(
        `${process.env.NEXT_PUBLIC_SERVER}/iot/sensors${
          sharedWithMe ? "?sharedWithMe=true" : ""
        }`,
        {
          authToken: authState.token,
          iotAppId: router.query.appId,
        }
      );

      setIoTApps({
        fetched: true,
        message: "Success Fethed Stories",
        status: "success",
        sensors: IoTApp.data.sensors,
      });
    } catch (err) {
      console.error(err);
      setIoTApps({
        fetched: true,
        message: "error on server",
        status: "error",
      });
    }
  }
  //   const authState = useSelector((state: RootStore) => state.user);

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <HeaderStyled>
        <Typography variant="h5" color="grayText">
          Sensor IoT Cloud App Mu {sharedWithMe && "- Shared with Me"}
        </Typography>

        {!sharedWithMe && (
          <>
            <Button variant="contained" onClick={handleClickOpenCreateBranch}>
              Create Sensor
            </Button>
            <CreateBranchDialog
              isOpen={openCreateBranch}
              handleCloseCreateBranch={handleCloseCreateBranch}
            />
          </>
        )}
      </HeaderStyled>

      {IoTApps.sensors && IoTApps.sensors.length > 0 ? (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* @ts-ignore */}
            {IoTApps.sensors.map((branch) => (
              <Grid
                key={branch.name}
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
                      {/* eslint-disable-next-line no-underscore-dangle */}
                      <Link
                        // @ts-ignore
                        href={`/cloud/iot/${router.query.appId}/${branch._id}`}
                      >
                        {" "}
                        {branch.name}{" "}
                      </Link>
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {branch.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Typography sx={{ mt: 3, mb: 1.5 }} color="text.secondary">
          {IoTApps.sensors?.length === 0 &&
            "Kamu belum mempunyai sensor di IoT Cloud App."}
        </Typography>
      )}

      {!IoTApps.fetched && (
        <Typography sx={{ mt: 3, mb: 1.5 }} color="text.secondary">
          Fetching Sensors
        </Typography>
      )}
    </>
  );
}
