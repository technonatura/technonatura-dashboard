import * as React from "react";

// import { useSelector } from "react-redux";
// import { RootStore } from "@/global/index";

import axios from "axios";

import { styled, alpha } from "@mui/material/styles";

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
} from "@mui/material";

import Label from "components/Label";
import CardActions from "@mui/material/CardActions";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
let year: number[] = [];

for (let i = new Date().getFullYear() - 6; i <= new Date().getFullYear(); i++) {
  year.push(i);
}
export default function ArchivesComponent({
  Branches,
}: {
  Branches: {
    fetched: boolean;
    message: string;
    status: string;
    branches: Array<{ title: string; name: string; active: boolean }>;
  };
}) {
  const gradeOptions = grade.map((option) => {
    return {
      firstLetter:
        option <= 6 ? "MI" : option >= 6 && option <= 9 ? "MTS" : "MA",
      value: option,
    };
  });

  const [openBranchesFilter, setOpenBranchesFilter] =
    React.useState<boolean>(false);

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
              loading={!Branches.branches}
              options={
                Branches.branches &&
                Branches.branches?.filter((branch) => branch.active)
              }
              getOptionLabel={(option) => option.title}
              sx={{ width: 240 }}
              renderInput={(params) => <TextField {...params} label="Branch" />}
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
          <div>
            <Autocomplete
              id="grouped-demo"
              options={gradeOptions}
              groupBy={(option) => option.firstLetter}
              // @ts-ignore
              getOptionLabel={(option) => option.value}
              sx={{ width: 100 }}
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
    </>
  );
}
