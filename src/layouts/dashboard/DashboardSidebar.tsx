import { useRouter } from "next/router";
import NextLink from "next/link";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import PropTypes from "prop-types";
import { useEffect } from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";

// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

// @ts-ignore
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useRouter();
  const authState = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box sx={{ display: "inline-flex" }}>
          <Logo />{" "}
          <Typography
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            color="primary"
          >
            {process.env.NEXT_PUBLIC_VERSION}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5, cursor: "pointer", "&:hover": {} }}>
        <Link underline="none" component={NextLink} href="/settings">
          <AccountStyle>
            {authState.loading ? (
              <CircularProgress />
            ) : (
              <>
                {" "}
                {/* @ts-ignore */}
                <Avatar
                  alt={authState.me?.username}
                  src={authState.me?.avatar}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.primary", wordBreak: "break-word" }}
                  >
                    {authState.me?.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    @{authState.me?.username}
                  </Typography>
                </Box>{" "}
              </>
            )}
          </AccountStyle>
        </Link>
      </Box>

      <NavSection />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: "relative",
            bgcolor: "grey.200",
          }}
        >
          {/* <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: "absolute", top: -50 }}
          /> */}

          <Box sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h6">
              Interested to Contribute?
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              We open the code base on GitHub!
            </Typography>
          </Box>

          <Button
            fullWidth
            href="https://github.com/technonatura/technonatura-dashboard"
            target="_blank"
            variant="contained"
          >
            Give a Star!
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
