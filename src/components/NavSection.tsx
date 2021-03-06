import NextLink from "next/link";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useState } from "react";
import { Icon } from "@iconify/react";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  Collapse,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import sidebarConfig, {
  sidebarConfigItem,
} from "layouts/dashboard/SidebarConfig";

// eslint-disable-next-line import/no-named-as-default
import checkRoles from "utils/checkRoles";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItem button disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

function NavItem({
  item,
  isActiveRoot,
  match,
  isUserVerified,
  userRoles,
}: {
  item: sidebarConfigItem;
  isActiveRoot: boolean;
  // eslint-disable-next-line no-unused-vars
  match: (path: string) => boolean;

  isUserVerified?: boolean;
  userRoles: string[];
}) {
  const theme = useTheme();

  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          // @ts-ignore
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* eslint-disable-next-line no-shadow */}
            {children.map((item, index) => {
              // eslint-disable-next-line no-shadow
              const { title, path, isForVerified } = item;
              const isActiveSub = match(path);

              if (isForVerified && !isUserVerified) {
                return "";
              }

              if (checkRoles(userRoles, item.forRoles)) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <NextLink key={index} href={path}>
                    <ListItemStyle
                      key={title}
                      sx={{
                        ...(isActiveSub && activeSubStyle),
                      }}
                    >
                      <ListItemIconStyle>
                        <Box
                          component="span"
                          sx={{
                            width: 4,
                            height: 4,
                            display: "flex",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "text.disabled",
                            // eslint-disable-next-line no-shadow
                            transition: (theme) =>
                              theme.transitions.create("transform"),
                            ...(isActiveSub && {
                              transform: "scale(2)",
                              bgcolor: "primary.main",
                            }),
                          }}
                        />
                      </ListItemIconStyle>
                      <ListItemText disableTypography primary={title} />
                    </ListItemStyle>
                  </NextLink>
                );
              }
              return "";
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NextLink href={path}>
      <ListItemStyle
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </ListItemStyle>
    </NextLink>
  );
}

export default function NavSection() {
  const { pathname } = useRouter();
  const authState = useSelector((state: RootStore) => state.user);

  const match = (path: string) => path === pathname;

  return (
    <Box>
      <List disablePadding>
        {sidebarConfig.map((item) => {
          if (item.isForVerified) {
            return (
              authState.me?.isAccountVerified &&
              checkRoles(authState.me.roles, item.forRoles) && (
                <NavItem
                  userRoles={authState.me.roles}
                  key={item.title}
                  item={item}
                  isActiveRoot={match(item.path)}
                  match={match}
                  isUserVerified={authState.me?.isAccountVerified}
                />
              )
            );
          }

          return (
            <NavItem
              // @ts-ignore
              userRoles={authState.me.roles}
              key={item.title}
              item={item}
              isActiveRoot={match(item.path)}
              match={match}
              isUserVerified={authState.me?.isAccountVerified}
            />
          );
        })}
      </List>
    </Box>
  );
}
