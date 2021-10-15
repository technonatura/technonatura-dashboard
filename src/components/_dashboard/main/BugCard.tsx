import React from "react";

import { Typography, Card, Link } from "@mui/material";
// import { AppWeeklySales } from "components/_dashboard/app";

import { Icon } from "@iconify/react";
import BugReport from "@iconify/icons-ic/bug-report";

// material
import { alpha, experimentalStyled as styled } from "@mui/material/styles";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  // @ts-ignore
  color: theme.palette.error.darker,
  // @ts-ignore
  backgroundColor: theme.palette.error.lighter,
  height: "100%",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.error.dark,
    0
  )} 0%, ${alpha(theme.palette.error.dark, 0.24)} 100%)`,
}));

function HelpCard() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={BugReport} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3"> Bugs</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Submit a new issue to our{" "}
        <Link href="https://github.com/technonatura/technonatura-dashboard">
          github repo
        </Link>{" "}
        if you found bug.
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
