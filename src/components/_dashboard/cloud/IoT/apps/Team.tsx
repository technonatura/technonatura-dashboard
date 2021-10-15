import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { FormikProps } from "formik";
// material

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  Autocomplete,
  TextField,
  Box,
  Button,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { TeammateInterface } from "types/models/IoT/IoTApp.model";
import { UserInterface } from "types/models/User.model";

import UserCard from "./UserCard";

interface UserI {
  avatar: string;
  id: string;
  isAccountVerified: boolean;
  name: string;
  roleInTechnoNatura: string;
  startPeriod: number;
  username: string;
}

// eslint-disable-next-line react/display-name
export default React.memo(
  ({
    formik,
    users,
  }: {
    formik: FormikProps<{
      name: string;
      visibility: string;
      desc: string;
      isTeam: boolean;
      team: Array<TeammateInterface & UserInterface>;
    }>;
    users: UserI[];
  }) => {
    const authState = useSelector((state: RootStore) => state.user);

    const [addUser, setAddUser] = React.useState<UserI | undefined>();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChangeExpand =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
    const { values, getFieldProps } = formik;

    return (
      <Accordion
        sx={{ my: 2 }}
        expanded={expanded === "panel1"}
        onChange={handleChangeExpand("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Pengaturan Tim
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Apakah kamu bertim?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Apakah kamu bertim? Ingin berkolaborasi dengan anggota tim mu?
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={values.isTeam} />}
              label="Saya bertim"
              {...getFieldProps("isTeam")}
            />
          </FormGroup>

          {values.isTeam && (
            <>
              <Grid container spacing={3}>
                {values.team.map((e) => (
                  <Grid
                    // eslint-disable-next-line no-underscore-dangle
                    key={e._id}
                    item
                    xs={12}
                    sm={12}
                    // @ts-ignore
                    md={12}
                  >
                    <UserCard
                      user={e}
                      // @ts-ignore
                      formik={formik}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid container mt={3} spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  // @ts-ignore
                  md={10}
                >
                  <Autocomplete
                    fullWidth
                    // value={value}
                    onChange={(e, value) => {
                      // @ts-ignore
                      setAddUser(value);
                    }}
                    getOptionLabel={(option) => option.username}
                    renderInput={(params) => (
                      // @ts-ignore
                      <TextField {...params} label="Controllable" />
                    )}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{
                          fontSize: 15,
                          "& > span": { mr: "10px", fontSize: 18 },
                        }}
                        {...props}
                      >
                        @{option.username}
                      </Box>
                    )}
                    id="controllable-states-demo"
                    options={users.filter(
                      (user) =>
                        // eslint-disable-next-line
                        String(user.id) !== authState.me?._id &&
                        values.team.findIndex(
                          (teammate) => teammate.userId === user.id
                        ) === -1
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  // @ts-ignore
                  md={2}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    style={{ width: "100%" }}
                    onClick={() => {
                      const found = users.find(
                        (user) => user.id === addUser?.id
                      );

                      if (found) {
                        /* eslint-disable no-underscore-dangle */
                        // @ts-ignore
                        if (addUser?.id !== authState.me._id) {
                          formik.setFieldValue("team", [
                            ...values.team,
                            {
                              ...addUser,
                              userId:
                                // @ts-ignore
                                addUser.id,
                              role: "admin",
                            },
                          ]);

                          setAddUser(undefined);
                        } else {
                          alert("you are automatically an owner.");
                        }
                      }
                    }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    );
  }
);
