import * as React from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import {
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  Autocomplete,
  Box,
  Stack,
  Select,
  CircularProgress,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useFormik } from "formik";
import ProjectSchema, { ProjectSchemaI } from "./CreateProjectSchema";
import { ClassroomInterface } from "types/models/classroom.model";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@mui/material/styles";
// // material
// import { Container, Box, Typography } from "@mui/material";

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

export default function CreateProjectComponent() {
  const authState = useSelector((state: RootStore) => state.user);
  const [expanded, setExpanded] = React.useState<string>("");
  const [classrooms, setClassrooms] = React.useState<{
    loading: boolean;
    fetched: boolean;
    error: boolean;
    data: ClassroomInterface[];
  }>({
    loading: true,
    fetched: false,
    error: false,
    data: [],
  });

  // eslint-disable-next-line no-unused-vars
  const formik = useFormik<ProjectSchemaI>({
    initialValues: {
      tags: [],
      title: "",
      desc: "",
      name: "",
      content: "",
      category: "",
      classroomId: "",

      draft: true,
    },
    validationSchema: ProjectSchema,
    onSubmit: () => {},
  });

  React.useEffect(() => {
    fetchClassrooms();
  }, []);

  async function fetchClassrooms() {
    try {
      // @ts-ignore
      const classrooms = await axios.get<
        {},
        {
          data: {
            message: string;
            status: "success" | "error" | "warning";
            classrooms: ClassroomInterface[];
          };
        }
      >(
        // @ts-ignore
        `${process.env.NEXT_PUBLIC_SERVER}/api/classrooms/?username=${authState.me.username}&grade=${authState.me?.roleInTechnoNatura.grade}&gradePeriod=${authState.me?.roleInTechnoNatura.startPeriod}`
      );
      setClassrooms({
        loading: false,
        fetched: true,
        // @ts-ignore
        classrooms: classrooms.data.classrooms,
      });
    } catch (err) {
      console.log("ERROR OCCURED WHEN FETCHING CLASSROOMS!", err);
      setClassrooms({
        loading: false,
        fetched: true,
        // @ts-ignore
        classrooms: [],
      });
    }
  }

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  if (classrooms.loading) {
    return (
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 3, color: "text.secondary" }}>
            Fetching some datas..
          </Typography>
        </Box>
      </Container>
    );
  }

  if (classrooms.error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error occured when fetching classrooms</AlertTitle>
        We are so sorry that an error occured when fetching classrooms, this
        unables you to create project
      </Alert>
    );
  }
  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              General settings
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Used for SEO Optimization
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Project Meta Data
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              More depth about your project
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row">
              <FormControl
                fullWidth
                sx={{ mt: 3, pr: 1 }}
                // @ts-ignore
                error={errors.classroomId}
              >
                <InputLabel id="classroomId">Kategori</InputLabel>
                <Select
                  labelId="classroomId"
                  id="demo-simple-select"
                  {...getFieldProps("classroomId")}
                  label="Kategori"
                  disabled={isSubmitting}
                  error={Boolean(errors.classroomId)}
                >
                  <MenuItem value="art">Art</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="social">Social</MenuItem>
                  <MenuItem value="entrepreneur">Entrepreneur</MenuItem>
                </Select>
                <FormHelperText> {errors.classroomId}</FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mt: 3, pl: 1 }}
                // @ts-ignore
                error={errors.category}
              >
                <InputLabel id="category">Kategori</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  {...getFieldProps("category")}
                  label="Kategori"
                  disabled={isSubmitting}
                  error={Boolean(errors.category)}
                >
                  <MenuItem value="art">Art</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="social">Social</MenuItem>
                  <MenuItem value="entrepreneur">Entrepreneur</MenuItem>
                </Select>
                <FormHelperText> {errors.category}</FormHelperText>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Project Content
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
