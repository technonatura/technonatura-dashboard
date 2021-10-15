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
  textAlign: "center",
  padding: theme.spacing(5, 0),
  // @ts-ignore
  color: theme.palette.primary.darker,
  // @ts-ignore
  backgroundColor: theme.palette.primary.lighter,
  height: "100%",
}));

function HelpCard() {
  return (
    <RootStyle>
      <Typography variant="h3"> Need Help?</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Visit our{" "}
        <Link href="https://hc.technonatura.vercel.app" target="_blank">
          Help Centre
        </Link>{" "}
        to learn more about this Dashboard.
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
