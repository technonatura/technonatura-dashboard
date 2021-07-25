import PropTypes from "prop-types";
// material
import { Box } from "@material-ui/core";

// ----------------------------------------------------------------------

Logo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="/static/logo.svg"
      sx={{ width: 40, height: 40, ...sx }}
    />
  );
}
