import React from "react";

import { Typography, Card } from "@material-ui/core";
// import { AppWeeklySales } from "components/_dashboard/app";

// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

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

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// eslint-disable-next-line no-undef
function MainCard({
  Icon,
  title,
  description,
}: {
  // eslint-disable-next-line no-undef
  Icon?: JSX.Element;
  title: string | JSX.Element;
  // eslint-disable-next-line no-undef
  description: string | JSX.Element;
}) {
  return (
    <RootStyle>
      {Icon && (
        <IconWrapperStyle>
          {/* @ts-ignore */}
          <Icon />
        </IconWrapperStyle>
      )}

      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {description}
      </Typography>
    </RootStyle>
  );
}

export default MainCard;
