import React from "react";

import { Typography, Card, Link } from "@mui/material";
// import { AppWeeklySales } from "components/_dashboard/app";

// material
import { experimentalStyled as styled } from "@mui/material/styles";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "start",
  padding: theme.spacing(5, 4),
  // @ts-ignore
  color: theme.palette.primary.darker,
  // @ts-ignore
  backgroundColor: theme.palette.primary.lighter,
  height: "100%",
}));

function HelpCard() {
  return (
    <RootStyle>
      <Typography variant="h3">Documentation</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Please visit{" "}
        <Link href="https://cloud.technonatura.vercel.app/docs">
          Cloud Docs or API Docs.
        </Link>{" "}
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
