import PropTypes from "prop-types";
import React from "react";
// material
import { Box } from "@material-ui/core";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Page = React.forwardRef(
  (
    {
      children,
      /* eslint-disable-next-line no-unused-vars */
      title = "",
      ...other
    },
    ref
  ) => (
    <Box ref={ref} {...other}>
      {children}
    </Box>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
