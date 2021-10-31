// Default theme. ~960B
import "@vime/core/themes/default.css";

// Optional light theme (extends default). ~400B
import "@vime/core/themes/light.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import * as React from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
// import NextLink from "next/link";

import { isMobile } from "react-device-detect";

// material
import { styled } from "@mui/material/styles";
// material
import {
  Container,
  Box,
  Typography,
  Link,
  Alert,
  AlertTitle,
  CircularProgress,
  Stack,
} from "@mui/material";

// components
import Page from "components/Page";
import CreateProject from "components/_dashboard/project/Create";

import checkRoles from "@utils/checkRoles";

import { ProjectPostInterface } from "@/types/models/project";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function RolesPage() {
  const router = useRouter();
  const authState = useSelector((state: RootStore) => state.user);
  const [project, setProject] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    project?: ProjectPostInterface;
  }>({ fetched: false, message: "", status: "" });

  React.useEffect(() => {
    if (router.query.projectName && !project.fetched && !project.project) {
      fetchProject();
    }
  }, [router.query.projectName]);

  async function fetchProject() {
    try {
      // eslint-disable-next-line no-shadow
      const projectsRes = await axios.get<{
        message: string;
        status: string;
        project?: ProjectPostInterface;
      }>(
        `${process.env.NEXT_PUBLIC_SERVER}/project/${router.query.projectName}`
      );
      setProject({
        fetched: true,
        message: "Success Fethed Projects",
        status: "success",
        project: projectsRes.data.project,
      });
    } catch (err) {
      console.error(err);
      setProject({
        fetched: true,
        message: "error on server",
        status: "error",
      });
    }
  }
  console.log(project, router.query.projectName);
  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  if (authState.me && !authState.me.isAccountVerified) {
    router.push("/");
    return (
      <>
        <NextSeo
          title="TechnoNatura App - 404 BLOCKED"
          description="The TechnoNatura Social Media and Dashboard"
          canonical="https://dashboard.technonatura.vercel.app"
        />
        <RootStyle
          // @ts-ignore
          title="404 Page Not Found "
        >
          <Container>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <div>
                <Typography variant="h3" paragraph>
                  Only Verified User Have an Access To This Cloud Service.
                </Typography>
              </div>
              <Typography sx={{ mt: 3, color: "text.secondary" }}>
                We are sorry you do not have an access to this page :(
              </Typography>
            </Box>
          </Container>
        </RootStyle>
      </>
    );
  }

  if (authState.me && checkRoles(authState.me.roles, "teacher")) {
    return (
      <Alert severity="info">
        <AlertTitle>Teacher account doesn&apos;t have permission</AlertTitle>
        We are sorry that Teacher account doesn&apos;t have permission to post a
        project
      </Alert>
    );
  }

  if (isMobile) {
    return (
      <Alert severity="info">
        <AlertTitle>Only Supported on Desktop</AlertTitle>
        We are sorry that this feature is only supported on Desktop. If this was
        a mistake please contact{" "}
        <Link href="https://t.me/aldhanekaa">Aldhaneka</Link>.
      </Alert>
    );
  }

  if (!project.fetched) {
    return (
      <Container sx={{ padding: "100px 0px" }}>
        <Container sx={{ mt: 10 }}>
          <Stack
            sx={{ color: "grey.500" }}
            spacing={2}
            justifyContent="center"
            direction="row"
            alignItems="center"
          >
            <CircularProgress color="primary" />
            <Typography>Fetching Your Project</Typography>
          </Stack>
        </Container>
      </Container>
    );
  }
  // eslint-disable-next-line no-unused-vars
  return (
    <Container sx={{ padding: "100px 0px" }}>
      <NextSeo
        title="TechnoNatura App - Project"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />

      {project.project ? (
        <CreateProject values={project.project} />
      ) : (
        <Alert severity="info">
          <AlertTitle>Nothing&apos;s here</AlertTitle>
          We couldn&apos;t find the project you are looking for.{" "}
          <Link href="/">Home</Link>.
        </Alert>
      )}
    </Container>
  );
}
