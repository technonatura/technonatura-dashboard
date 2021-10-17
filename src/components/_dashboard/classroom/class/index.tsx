import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

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
  Menu,
  MenuItem,
  Autocomplete,
  Box,
  TextField,
} from "@mui/material";

import Label from "components/Label";
import CardActions from "@mui/material/CardActions";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CreateBranchDialog from "./create";
import checkRoles from "@utils/checkRoles";
// import

const grade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function ClassroomPage() {
  const gradeOptions = grade.map((option) => {
    return {
      firstLetter:
        option <= 6 ? "MI" : option >= 6 && option <= 9 ? "MTS" : "MA",
      value: option,
    };
  });
  const [Branches, setBranches] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    branches?: Array<{ title: string; name: string; active: boolean }>;
  }>({ fetched: false, message: "", status: "" });
  const [openCreateClassroom, setOpenCreateClassroom] = React.useState(false);

  const authState = useSelector((state: RootStore) => state.user);
  const [Grade, setGrade] = React.useState(() =>
    // @ts-ignore
    authState.me?.roleInTechnoNatura.teacher
      ? // @ts-ignore
        String(authState.me?.roleInTechnoNatura.grade)
      : // @ts-ignore
      authState.me?.roleInTechnoNatura.student
      ? // @ts-ignore
        authState.me?.roleInTechnoNatura.grade
      : 1
  );

  const handleClickOpenCreateClassroom = () => {
    setOpenCreateClassroom(true);
  };

  const handleCloseCreateClassroom = () => {
    setOpenCreateClassroom(false);
    console.log(openCreateClassroom);
  };

  React.useEffect(() => {
    fetchBranches();
  }, []);

  async function fetchBranches() {
    try {
      // eslint-disable-next-line no-shadow
      const branches = await axios.get<{
        message: string;
        status: string;
        branches?: Array<{ title: string; name: string; active: boolean }>;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/api/branches`);
      setBranches({
        fetched: true,
        message: "Success Fethed Branch",
        status: "success",
        branches: branches.data.branches,
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
        sx={{ marginTop: 1 }}
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h5" color="grayText">
          TechnoNatura Classes
        </Typography>
        {authState.me?.roles &&
          checkRoles(authState.me?.roles, ["teacher", "admin"]) && (
            <Stack direction="row" spacing={2}>
              <div>
                <Autocomplete
                  id="grouped-demo"
                  // @ts-ignore
                  options={Branches.branches?.filter((branch) => branch.active)}
                  // @ts-ignore
                  getOptionLabel={(option) => option.title}
                  sx={{ width: 225 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Branch" />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.title}
                    </Box>
                  )}
                />
              </div>
              {/* {checkRoles(authState.me?.roles, ["admin"])} */}
              <div>
                <Autocomplete
                  id="grouped-demo"
                  options={gradeOptions}
                  groupBy={(option) => option.firstLetter}
                  // @ts-ignore
                  getOptionLabel={(option) => option.value}
                  sx={{ width: 100 }}
                  value={{
                    // @ts-ignore
                    firstLetter: authState.me?.roleInTechnoNatura.teacher
                      ? // @ts-ignore
                        String(authState.me?.roleInTechnoNatura.grade)
                      : String(8),
                    // @ts-ignore
                    value: authState.me?.roleInTechnoNatura.teacher
                      ? // @ts-ignore
                        String(authState.me?.roleInTechnoNatura.grade)
                      : String(8),
                  }}
                  disabled={checkRoles(authState.me?.roles, ["teacher"])}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grade"
                      // @ts-ignore
                      disabled={checkRoles(authState.me?.roles, ["teacher"])}
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.value}
                    </Box>
                  )}
                />
              </div>

              <Button
                variant="contained"
                onClick={handleClickOpenCreateClassroom}
              >
                Create Class
              </Button>
            </Stack>
          )}
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
        isOpen={openCreateClassroom}
        handleCloseCreateBranch={handleCloseCreateClassroom}
        fetchBranches={fetchBranches}
        branches={Branches.branches?.filter((branch) => branch.active)}
      />
    </>
  );
}
