import React from "react";

import { Typography, Card } from "@material-ui/core";
// import { AppWeeklySales } from "components/_dashboard/app";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "start",
  padding: theme.spacing(5, 5),
  // @ts-ignore
  color: theme.palette.primary.darker,
  // @ts-ignore
  backgroundColor: theme.palette.primary.lighter,
}));

function HelpCard() {
  const authState = useSelector((state: RootStore) => state.user);

  return (
    <RootStyle>
      <Typography variant="h3">
        Welcome to Cloud Service, {authState.me?.fullName}!
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Discover our great Public API.
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
