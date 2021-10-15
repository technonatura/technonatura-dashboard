import * as React from "react";

// import { useSelector } from "react-redux";
// import { RootStore } from "@/global/index";

import axios from "axios";

// material
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";

import Label from "components/Label";
import CardActions from "@mui/material/CardActions";
import CreateBranchDialog from "./create";
// import

export default function RolesPage() {
  const [Branches, setBranches] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    branches?: Array<{ title: string; name: string; active: boolean }>;
  }>({ fetched: false, message: "", status: "" });
  const [openCreateBranch, setOpenCrateBranch] = React.useState(false);

  //   const authState = useSelector((state: RootStore) => state.user);

  const handleClickOpenCreateBranch = () => {
    setOpenCrateBranch(true);
  };

  const handleCloseCreateBranch = () => {
    setOpenCrateBranch(false);
    console.log(openCreateBranch);
  };

  React.useEffect(() => {
    fetchBranches();
  }, []);

  async function fetchBranches() {
    try {
      // eslint-disable-next-line no-shadow
      const storiesRes = await axios.get<{
        message: string;
        status: string;
        branches?: Array<{ title: string; name: string; active: boolean }>;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/api/branches`);
      setBranches({
        fetched: true,
        message: "Success Fethed Stories",
        status: "success",
        branches: storiesRes.data.branches,
      });
    } catch (err) {
      // console.error(err);
      setBranches({
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
      <Stack
        sx={{ marginTop: 3 }}
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h5" color="grayText">
          TechnoNatura Branches
        </Typography>
        <Button variant="contained" onClick={handleClickOpenCreateBranch}>
          Create Branch
        </Button>
      </Stack>

      {
        // @ts-ignore
        Branches.branches?.length > 0 ? (
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* @ts-ignore */}
              {Branches.branches.map((branch) => (
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
                        {branch.title}{" "}
                        <Label size="small">
                          {branch.active ? "Active" : "Not active"}
                        </Label>
                      </Typography>

                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {branch.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {!branch.active && (
                        <Button variant="contained">Activate</Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <Typography sx={{ mt: 3, mb: 1.5 }} color="text.secondary">
            Branches is empty
          </Typography>
        )
      }
      <CreateBranchDialog
        isOpen={openCreateBranch}
        handleCloseCreateBranch={handleCloseCreateBranch}
        fetchBranches={fetchBranches}
      />
    </>
  );
}
