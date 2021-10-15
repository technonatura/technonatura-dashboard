import PropTypes from "prop-types";
import NextLink from "next/link";

// material
import { experimentalStyled as styled } from "@mui/styles";
import { Typography, Stack } from "@mui/material";

import LanguagePopover from "layouts/dashboard/LanguagePopover";

// components
import Logo from "../components/Logo";
//
import { MHidden } from "../components/@material-extend";

// ----------------------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default function AuthLayout({ children }) {
  return (
    <HeaderStyle>
      <Stack
        display="flex"
        direction="row"
        style={{ width: "400px" }}
        justifyContent="space-between"
      >
        <NextLink href="/">
          <Logo />
        </NextLink>
        <LanguagePopover />
      </Stack>

      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 },
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
