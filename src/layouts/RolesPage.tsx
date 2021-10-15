import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// material
import { styled } from "@mui/styles";
// material
import { Container, Box, Typography } from "@mui/material";

// components
import Page from "components/Page";

// eslint-disable-next-line import/no-named-as-default
import checkRoles from "utils/checkRoles";

// import

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function RolesPage(permission: Array<string>) {
  const authState = useSelector((state: RootStore) => state.user);

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );
  if (authState.me && checkRoles(authState.me?.roles, permission)) {
    return (
      <RootStyle
        // @ts-ignore
        title="404 Page Not Found "
      >
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <div>
              <Typography variant="h3" paragraph>
                You do not have access to this page
              </Typography>
            </div>
            <Typography sx={{ mt: 3, color: "text.secondary" }}>
              We are sorry you do not have an access to this page :(
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    );
  }
  // eslint-disable-next-line no-unused-vars
  return (
    /* eslint-disable no-undef */
    // eslint-disable-next-line no-unused-vars
    children: (user: typeof authState) => JSX.Element | JSX.Element[] | string
  ) => children(authState);
}
