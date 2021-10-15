import React from "react";
import { makeStyles } from "@mui/styles";

import LinearProgress from "@mui/material/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
};

export default Loader;
