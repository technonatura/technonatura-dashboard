import React from "react";

import { Typography, Card } from "@mui/material";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { useTranslation } from "react-i18next";

// material
import { experimentalStyled as styled } from "@mui/material/styles";
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
  const [t, i18n] = useTranslation("home");
  const authState = useSelector((state: RootStore) => state.user);

  return (
    <RootStyle>
      <Typography variant="h3">
        {t("greetings", { name: authState.me?.fullName })}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Discover the great TechnoNatura Dashboard, write a post, and show your
        cool school project to Internet!
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
