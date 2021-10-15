import React from "react";

import { Typography, Card } from "@mui/material";
// import { AppWeeklySales } from "components/_dashboard/app";

import { Icon } from "@iconify/react";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
// material
import { alpha, experimentalStyled as styled } from "@mui/styles";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 2),
  // @ts-ignore
  color: theme.palette.warning.darker,
  // @ts-ignore
  backgroundColor: theme.palette.warning.lighter,
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.warning.dark,
    0
  )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`,
}));

function HelpCard() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={fileTextFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">Story</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Visit to Story dashboard page to share your thoughts to Internet!
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
