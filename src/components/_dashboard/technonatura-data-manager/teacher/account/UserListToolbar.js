import { useState } from "react";

import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
import Verify from "@iconify/icons-ic/baseline-verified";

import { useSelector } from "react-redux";

// material
import { experimentalStyled as styled } from "@mui/styles";
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import VerifySomeTeachers from "./verifySomeTeachers";
import DeleteSomeUsers from "./deleteTeachers";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  selected,
  fetchUsers,
}) {
  const [openBackdrop, setBackdrop] = useState(false);

  const authState = useSelector((state) => state.user);

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: "text.disabled" }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <div>
          {/* <Tooltip
            onClick={async () => {
              setBackdrop(true);
              const res = await DeleteSomeUsers(
                selected,
                authState.token,
                // eslint-disable-next-line no-underscore-dangle
                authState.me._id
              );
              setBackdrop(false);

              if (res.title) {
                alert(`${res.title}
${res.message}`);
              }

              fetchUsers();
            }}
            title={`Delete Teacher & User${numSelected > 1 ? "s" : ""}`}
          >
            <IconButton>
              <Icon icon={trash2Fill} />
            </IconButton>
          </Tooltip> */}
          <Tooltip title={`Verify Teacher${numSelected > 1 ? "s" : ""}`}>
            <IconButton
              onClick={async () => {
                setBackdrop(true);
                await VerifySomeTeachers(selected, authState.token);
                setBackdrop(false);
                fetchUsers();
              }}
            >
              <Icon icon={Verify} />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </RootStyle>
  );
}
