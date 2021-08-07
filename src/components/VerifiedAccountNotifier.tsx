import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// material
import { Alert, AlertTitle, Stack, Link } from "@material-ui/core";

// @ts-ignore
// eslint-disable-next-line no-undef
export default function DashboardLayout(): JSX.Element | string {
  const authState = useSelector((state: RootStore) => state.user);

  if (!authState.me?.isAccountVerified)
    return (
      <>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Your account isn&apos;t verified.{" "}
            <strong>Most of the features</strong> are not accessible for
            unverified users. Please contact{" "}
            <Link href="https://t.me/aldhaneka">Aldhanekaa</Link> to get
            verified quickly.
          </Alert>
        </Stack>
      </>
    );

  return "";
}
