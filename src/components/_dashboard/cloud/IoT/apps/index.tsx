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

import { IoTAppInterface } from "@/types/models/IoT/IoTApp.model";

import CreateBranchDialog from "./create";
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
    apps?: Array<IoTAppInterface>;
  }>({ fetched: false, message: "", status: "" });
  const [openCreateBranch, setOpenCrateBranch] = React.useState(false);

  const authState = useSelector((state: RootStore) => state.user);

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
      const storiesRes = await axios.post<{
        message: string;
        status: string;
        apps?: Array<IoTAppInterface>;
      }>(
        `${process.env.NEXT_PUBLIC_SERVER}/iot/apps${
          sharedWithMe ? "?sharedWithMe=true" : ""
        }`,
        {
          authToken: authState.token,
        }
      );
      setIoTApps({
        fetched: true,
        message: "Success Fethed Stories",
        status: "success",
        apps: storiesRes.data.apps,
      });
    } catch (err) {
      // console.error(err);
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
          TechnoNatura Cloud Apps {sharedWithMe && "- Shared with Me"}
        </Typography>

        {!sharedWithMe && (
          <>
            <Button variant="contained" onClick={handleClickOpenCreateBranch}>
              Create App
            </Button>
            <CreateBranchDialog
              isOpen={openCreateBranch}
              handleCloseCreateBranch={handleCloseCreateBranch}
            />
          </>
        )}
      </HeaderStyled>

      {!IoTApps.fetched && (
        <Typography sx={{ mt: 3, mb: 1.5 }} color="text.secondary">
          Fetching Apps
        </Typography>
      )}

      {IoTApps.apps &&
      (sharedWithMe
        ? IoTApps.apps.filter((app) => app.own != authState.me?._id)
        : IoTApps.apps
      ).length > 0 ? (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* @ts-ignore */}
            {(sharedWithMe
              ? IoTApps.apps.filter((app) => app.own != authState.me?._id)
              : IoTApps.apps
            ).map((branch) => (
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
                      <Link href={`/cloud/iot/${branch._id}`}>
                        {" "}
                        {branch.name}{" "}
                      </Link>
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {branch.name}
                    </Typography>

                    <Label size="small" style={{ marginLeft: "5px" }}>
                      {branch.visibility}
                    </Label>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Typography sx={{ mt: 3, mb: 1.5 }} color="text.secondary">
          {sharedWithMe
            ? "Tidak ada orang yang membagikan appnya ke anda."
            : "Kamu belum mempunyai aplikasi IoT Cloud App."}
        </Typography>
      )}
    </>
  );
}
