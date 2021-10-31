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
  InputLabel,
  Select,
  FormControl,
  IconButton,
  Tooltip,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Label from "components/Label";
import CardActions from "@mui/material/CardActions";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import CreateBranchDialog from "./create";
import checkRoles from "@utils/checkRoles";
import { ClassroomInterface } from "types/models/classroom.model";

const grade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function ClassroomPage({
  Branches,
}: {
  Branches: {
    fetched: boolean;
    message: string;
    status: string;
    branches: Array<{ title: string; name: string; active: boolean }>;
  };
}) {
  const [classrooms, setClassrooms] = React.useState<{
    loading: boolean;
    fetched: boolean;
    error: boolean;
    data: ClassroomInterface[];
  }>({
    loading: true,
    fetched: false,
    error: false,
    data: [],
  });
  const gradeOptions = grade.map((option) => {
    return {
      firstLetter:
        option <= 6 ? "MI" : option >= 6 && option <= 9 ? "MTS" : "MA",
      value: option,
    };
  });

  const [openCreateClassroom, setOpenCreateClassroom] = React.useState(false);
  const [openSelectedBranch, setSelectedBranch] =
    React.useState<string>("false");

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
    fetchClassrooms();
  }, []);

  async function fetchClassrooms() {
    try {
      // @ts-ignore
      const classrooms = await axios.get<
        {},
        {
          data: {
            message: string;
            status: "success" | "error" | "warning";
            classrooms: ClassroomInterface[];
          };
        }
      >(`${process.env.NEXT_PUBLIC_SERVER}/api/classrooms/`);

      setClassrooms({
        loading: false,
        fetched: true,
        error: false,
        // @ts-ignore
        data: classrooms.data.classrooms,
      });
    } catch (err) {
      console.log("ERROR OCCURED WHEN FETCHING CLASSROOMS!", err);
      setClassrooms({
        loading: false,
        fetched: true,
        error: true,
        data: [],
      });
    }
  }

  if (classrooms.loading) {
    return (
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 3, color: "text.secondary" }}>
            Fetching some datas..
          </Typography>
        </Box>
      </Container>
    );
  }

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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <FormControl fullWidth style={{ width: "210px" }}>
                    <InputLabel id="branch">Cabang TechnoNatura</InputLabel>

                    <Select
                      name="branch"
                      fullWidth
                      label="Cabang TechnoNatura"
                      onChange={(e) => {
                        // @ts-ignore
                        setSelectedBranch(e.target.value);
                      }}
                      // error={Boolean(errors.branch)}
                      // helperText={errors.branch}
                    >
                      {/* @ts-ignore */}
                      {Branches.branches
                        .filter((branch) => branch.active)
                        .map((branch) => (
                          // @ts-ignore
                          <MenuItem key={branch._id} value={branch._id}>
                            {branch.title}
                          </MenuItem>
                        ))}
                    </Select>
                    {/* <FormHelperText>{errors.branch}</FormHelperText> */}
                  </FormControl>
                </Stack>
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
                    firstLetter: Grade,
                    // @ts-ignore
                    value: Grade,
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

              <label htmlFor="icon-button-file">
                <IconButton color="primary">
                  <SearchIcon />
                </IconButton>
              </label>
              <label htmlFor="icon-button-file">
                <Tooltip title="Add Class">
                  <IconButton
                    color="primary"
                    onClick={handleClickOpenCreateClassroom}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </label>
            </Stack>
          )}
      </Stack>

      {
        // @ts-ignore
        classrooms.data.length > 0 ? (
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* @ts-ignore */}
              {classrooms.data.map((classroom) => (
                <Grid
                  key={classroom.name}
                  item
                  xs={12}
                  sm={5}
                  // @ts-ignore
                  md={4}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      src={classroom.thumbnail}
                    ></CardMedia>
                    <CardContent
                      sx={{ padding: "10px 15px", paddingTop: "20px" }}
                    >
                      <Typography variant="h5" component="div">
                        {classroom.title}{" "}
                        <Label size="small">
                          {classroom.grade} | {classroom.gradePeriod} –{" "}
                          {classroom.gradePeriod + 1}
                        </Label>
                        <Label size="small">{classroom.category}</Label>
                      </Typography>

                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {classroom.desc}
                      </Typography>
                    </CardContent>
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
        branches={Branches.branches?.filter((branch) => branch.active)}
      />
    </>
  );
}
