import PropTypes from "prop-types";
// material
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  StyledEngineProvider as StylesProvider,
  createTheme,
} from "@material-ui/core/styles";
//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

export default function ThemeConfig({ children }) {
  // const themeOptions = useMemo(
  //   () => ({
  //     palette,
  //     shape,
  //     typography,
  //     breakpoints,
  //     shadows,
  //     customShadows,
  //   }),
  //   [],
  // );

  const theme = createTheme({
    palette,
    shape,
    typography,
    breakpoints,
    shadows,
    customShadows,
  });
  theme.components = componentsOverride(theme);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StylesProvider>
  );
}

ThemeConfig.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
