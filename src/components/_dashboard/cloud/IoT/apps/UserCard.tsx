import * as React from "react";

import { FormikProps } from "formik";

import { styled, alpha } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Stack from "@material-ui/core/Stack";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Card, CardHeader, Avatar } from "@material-ui/core/";

import { TeammateInterface } from "types/models/IoT/IoTApp.model";
import { UserInterface } from "types/models/User.model";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(2),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Roles: Array<{
  title: string;
  name: "owner" | "admin" | "viewer" | "blocked";
}> = [
  {
    title: "Owner",
    name: "owner",
  },
  {
    title: "Admin",
    name: "admin",
  },
  {
    title: "Viewer",
    name: "viewer",
  },
  {
    title: "Block Access",
    name: "blocked",
  },
];

// eslint-disable-next-line react/display-name
export default React.memo(
  ({
    user,
    formik,
  }: {
    user: TeammateInterface & UserInterface;
    formik: FormikProps<{
      name: string;
      visibility: string;
      desc: string;
      isTeam: boolean;
      team: Array<TeammateInterface & UserInterface>;
    }>;
  }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Card sx={{ width: "100%", px: 2, py: 1.2 }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          // @ts-ignore
          title={user.name}
          subheader={`@${user.username}`}
          action={
            <Stack height="100%">
              <Button
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {user.role}
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {Roles.map((role) => (
                  <MenuItem
                    key={role.name}
                    onClick={() => {
                      formik.setFieldValue(
                        "team",
                        formik.values.team.map((teammate) => {
                          let copyofteammate = { ...teammate };
                          // @ts-ignore
                          if (teammate.id === user.id) {
                            copyofteammate = { ...teammate, role: role.name };
                          }
                          return copyofteammate;
                        })
                      );
                      handleClose();
                    }}
                    disableRipple
                  >
                    {role.title}
                  </MenuItem>
                ))}

                <Divider sx={{ my: 0.5 }} />

                <MenuItem onClick={handleClose} disableRipple>
                  Remove
                </MenuItem>
              </StyledMenu>
            </Stack>
          }
        />
      </Card>
    );
  }
);
