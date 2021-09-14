import * as React from "react";

// import { useSelector } from "react-redux";
// import { RootStore } from "@/global/index";

import axios from "axios";

import { styled, alpha } from "@material-ui/core/styles";

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
  MenuProps,
  Popover,
  Autocomplete,
  TextField,
  Box,
} from "@material-ui/core";

import Label from "components/Label";
import CardActions from "@material-ui/core/CardActions";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import CreateBranchDialog from "./create";
// import

//   @ts-ignore
function MenuPopover({ children, sx, ...other }) {
  return (
    //   @ts-ignore
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          mt: 1.5,

          overflow: "hidden",
          //   @ts-ignore
          boxShadow: (theme) => theme.customShadows.z20,
          border: (theme) => `solid 1px ${theme.palette.grey[200]}`,
          ...sx,
          maxWidth: "200px",
          minWidth: "200px",
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}

const grade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const branches = ["TechnoNatura Depok", "TechnoNatura Jogja"];
const year = [2019, 2020, 2021];

export default function ArchivesComponent() {
  const gradeOptions = grade.map((option) => {
    return {
      firstLetter:
        option <= 6
          ? "Elementary"
          : option >= 6 && option <= 9
          ? "Junior High School"
          : "High School",
      value: option,
    };
  });

  const branchAnchorEl = React.useRef(null);
  const gradeAnchorEl = React.useRef(null);

  const [openBranchesFilter, setOpenBranchesFilter] =
    React.useState<boolean>(false);
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
          TechnoNatura Archives
        </Typography>
        <Stack direction="row" spacing={2}>
          <div>
            <Autocomplete
              id="grouped-demo"
              options={branches}
              getOptionLabel={(option) => option}
              sx={{ width: 240 }}
              renderInput={(params) => <TextField {...params} label="Branch" />}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option}
                </Box>
              )}
            />
          </div>
          <div>
            <Autocomplete
              id="grouped-demo"
              options={gradeOptions}
              groupBy={(option) => option.firstLetter}
              // @ts-ignore
              getOptionLabel={(option) => option.value}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Grade" />}
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
          <div>
            <Autocomplete
              id="grouped-demo"
              options={year}
              // @ts-ignore
              getOptionLabel={(option) => option}
              sx={{ width: 125 }}
              renderInput={(params) => <TextField {...params} label="Year" />}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option}
                </Box>
              )}
            />
          </div>
          <Button variant="contained">Search</Button>
        </Stack>
      </Stack>

      <Grid
        item
        xs={12}
        sm={4}
        // @ts-ignore
        md={4}
        mt={3}
      >
        <Card>
          <CardContent sx={{ padding: "10px 15px", paddingTop: "20px" }}>
            <Typography variant="h5" component="div">
              8 TDA 2 <Label size="small">8.TDA.2</Label>
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              asd
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <CreateBranchDialog
        isOpen={openCreateBranch}
        handleCloseCreateBranch={handleCloseCreateBranch}
        fetchBranches={fetchBranches}
      />
    </>
  );
}
