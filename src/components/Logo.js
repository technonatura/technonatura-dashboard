import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="/static/techno-logo.png"
      sx={{ width: 100, height: 40, ...sx }}
    />
  );
}
