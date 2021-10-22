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
  TextField,
  Chip,
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
  const [TagInput, setTagInput] = React.useState<string>("");

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
      // @ts-ignore
      branch: authState.me?.roleInTechnoNatura.branch,
      draft: true,
    },

    validationSchema: ProjectSchema,
    onSubmit: () => {},
  });

  React.useEffect(() => {
    fetchClassrooms();
  }, []);

  React.useEffect(() => {
    formik.setFieldValue(
      "category",
      classrooms.data.find((c) => c._id === formik.values.classroomId)?.category
    );
  }, [formik.values.classroomId]);
  React.useEffect(() => {
    // const regex = /\s/i;
    if (!formik.touched.name) {
      const titleCopy = formik.values.title.replaceAll(" ", "-");
      formik.setFieldValue("name", titleCopy);
    }
  }, [formik.values.title]);

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case ",":
      case " ": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 3) {
          formik.setFieldValue("tags", [
            ...formik.values.tags,
            event.target.value.trim(),
          ]);
        }

        break;
      }
      default:
    }
  };

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
      console.log(classrooms.data);
      setClassrooms({
        loading: false,
        fetched: true,
        error: false,
        // @ts-ignore
        data: classrooms.data.classrooms,
      });
    } catch (err) {
      console.log("ERROR OCCURED WHEN FETCHING CLASSROOMS!", err);
      setClassrooms({
        loading: false,
        fetched: true,
        error: true,
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
            <TextField
              style={{ marginTop: 15 }}
              fullWidth
              label="Title"
              {...getFieldProps("title")}
              error={Boolean(
                // @ts-ignore
                touched["title"] && errors["title"]
              )}
              // @ts-ignore
              helperText={
                /* eslint-disable */

                errors["title"]

                /* eslint-enable */
              }
              disabled={isSubmitting}
            />
            <TextField
              // eslint-disable-next-line react/no-array-index-key
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(
                // @ts-ignore
                touched["name"] && errors["name"]
              )}
              // @ts-ignore
              helperText={
                /* eslint-disable */
                // @ts-ignore

                errors["name"]

                /* eslint-enable */
              }
              style={{ marginTop: 20 }}
            />
            <TextField
              style={{ marginTop: 15 }}
              fullWidth
              label="Description"
              {...getFieldProps("desc")}
              error={Boolean(
                // @ts-ignore
                touched["desc"] && errors["desc"]
              )}
              // @ts-ignore
              helperText={
                /* eslint-disable */

                errors["desc"]

                /* eslint-enable */
              }
              disabled={isSubmitting}
            />
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
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Tag Rules</AlertTitle>
            Tag naming should follow this regex rule:{" "}
            <strong>/^[a-zA-Z0-9._-]*$/</strong> . Seperate with{" "}
            <Chip label="," /> to create new tag . Tag length should be above 3
          </Alert>
          <AccordionDetails>
            <Autocomplete
              multiple
              id="fixed-tags-demo"
              value={formik.values.tags}
              onChange={(event, newValue) => {
                if (newValue) {
                  formik.setFieldValue("tags", [...newValue]);
                }
              }}
              options={["hey", "bruh"]}
              getOptionLabel={(option) => option}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    sx={{ m: "0 2px" }}
                    // {...getTagProps({ index })}
                    // disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              noOptionsText={<p>Create New</p>}
              style={{ width: "100%" }}
              renderInput={(params) => {
                params.inputProps.onKeyDown = handleKeyDown;
                return (
                  <TextField
                    {...params}
                    label="Project Tags"
                    placeholder="Your Project Tags"
                  />
                );
              }}
            />
            <Stack direction="row">
              <FormControl
                fullWidth
                sx={{ mt: 3, pr: 1 }}
                // @ts-ignore
                error={errors.classroomId}
              >
                <InputLabel id="classroomId">Classroom</InputLabel>
                <Select
                  labelId="classroomId"
                  id="demo-simple-select"
                  {...getFieldProps("classroomId")}
                  label="Classroom"
                  disabled={isSubmitting}
                  error={Boolean(errors.classroomId)}
                >
                  {classrooms.data &&
                    classrooms.data.map((classroom) => (
                      <MenuItem key={classroom.name} value={classroom._id}>
                        {classroom.title}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText> {errors.classroomId}</FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mt: 3, pl: 1 }}
                // @ts-ignore
                error={errors.category}
              >
                <TextField
                  id="demo-simple-select"
                  {...getFieldProps("category")}
                  placeholder="Kategori"
                  disabled={true}
                  error={Boolean(errors.category)}
                  value={formik.values.category}
                ></TextField>
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
