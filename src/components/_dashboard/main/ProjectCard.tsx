import React from "react";

import { Typography, Card, Link } from "@mui/material";
// import { AppWeeklySales } from "components/_dashboard/app";

import { Icon } from "@iconify/react";
import Folder from "@iconify/icons-ic/folder";

// material
import { alpha, experimentalStyled as styled } from "@mui/styles";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  // @ts-ignore
  color: theme.palette.success.darker,
  // @ts-ignore
  backgroundColor: theme.palette.success.lighter,
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

function HelpCard() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={Folder} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">Project</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Visit our{" "}
        <Link href="https://hc.technonatura.vercel.app" target="_blank">
          Project Page
        </Link>{" "}
        to learn more about this feature.
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
