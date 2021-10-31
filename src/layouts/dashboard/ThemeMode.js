import { useRef, useState, useEffect } from "react";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { DarkMode } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "global/index";
import { SetLang } from "global/actions/lang.action";
import { useCookies } from "react-cookie";
import i18next from "i18next";
import ms from "ms";

// components
import MenuPopover from "../../components/MenuPopover";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [cookies, setCookie, removeCookie] = useCookies(["lang"]);

  const dispatch = useDispatch();
  const LangState = useSelector((state) => state.lang);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [LANGS, SETLANGS] = useState([
    {
      value: "en-gb",
      label: "English (UK)",
      icon: "/static/icons/ic_flag_en.svg",
    },
    {
      value: "id",
      label: "Bahasa",
      icon: "/static/icons/ic_flag_id.svg",
    },
  ]);

  useEffect(() => {
    if (i18next.languages.includes(cookies.lang)) {
      setCookie("lang", cookies["lang"]);
      // @ts-ignore
      changeLanguage(cookies["lang"]);
    } else {
      setCookie("lang", "en-gb");
      // dispatch(SetLang("en-gb"));
      changeLanguage("en-gb");
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLanguage = (lang) => {
    const index = LANGS.findIndex((e) => e.value === lang);

    SETLANGS([
      LANGS[index],
      ...LANGS.slice(0, index),
      ...LANGS.slice(index + 1),
    ]);
    dispatch(SetLang(LANGS[index].value));
    setCookie("lang", LANGS[index].value, { maxAge: ms("1y") });
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
        color="primary"
      >
        <DarkMode />
      </IconButton>
    </>
  );
}
