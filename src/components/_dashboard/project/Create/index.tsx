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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Link,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { theme } from "theme";

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
import PickThumbnailDialog from "./Thumbnail";
import PickAssetsDialog from "./asset";
import ContentEditor from "./content/index";

export default function CreateProjectComponent() {
  const [OpenPickThumbnail, setOpenPickThumbnail] = React.useState(false);
  const [OpenPickAssets, setOpenPickAssets] = React.useState(false);

  const authState = useSelector((state: RootStore) => state.user);
  const [expanded, setExpanded] = React.useState<string>("");
  const [TagInput, setTagInput] = React.useState<string>("");

  const descriptionElementRef = React.useRef(null);

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
      assets: [],

      title: "",
      desc: "",
      name: "",
      content: "",
      category: "",
      classroomId: "",
      thumbnail: "",
      // @ts-ignore
      branch: authState.me?.roleInTechnoNatura.branch,
      draft: true,
    },

    validationSchema: ProjectSchema,
    onSubmit: () => {},
  });

  const handleClickOpenPickThumbnail = () => {
    setOpenPickThumbnail(true);
  };

  const handleClosePickThumbnail = () => {
    setOpenPickThumbnail(false);
  };
  React.useEffect(() => {
    if (OpenPickThumbnail) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        // @ts-ignore
        descriptionElement.focus();
      }
    }
  }, [OpenPickThumbnail]);

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
                  ? errors["name"]
                  : `https://tn-project/p/${formik.values.name}`

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
          <Grid container mt={2} spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              // @ts-ignore
              md={6}
            >
              <Card
                sx={{ width: "100%", m: "0px 10px" }}
                onClick={handleClickOpenPickThumbnail}
              >
                <CardActionArea sx={{ p: "10px 20px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Project Thumbnail
                    </Typography>
                    {formik.values.thumbnail ? (
                      <CardMedia
                        sx={{ mt: 2, borderRadius: "20px" }}
                        component="img"
                        image={formik.values.thumbnail}
                        alt="green iguana"
                      />
                    ) : (
                      <Container sx={{ p: "40px 0" }}>
                        <Box
                          sx={{
                            maxWidth: 480,
                            margin: "auto",
                            textAlign: "center",
                          }}
                        >
                          <Typography sx={{ mt: 3, color: "text.secondary" }}>
                            You haven&apos;t uploaded thumbnail yet.
                          </Typography>
                        </Box>
                      </Container>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              // @ts-ignore
              md={6}
            >
              <Card sx={{ width: "100%", m: "0px 10px", p: "10px 20px" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Project Assets
                  </Typography>
                  {formik.values.assets.length == 0 && (
                    <Container>
                      <Box
                        sx={{
                          maxWidth: 480,
                          margin: "auto",
                          textAlign: "center",
                        }}
                      >
                        <Typography sx={{ mt: 3, color: "text.secondary" }}>
                          You haven&apos;t uploaded any project assets yet.
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddPhotoAlternateIcon />}
                          sx={{ marginTop: 2 }}
                          onClick={() => setOpenPickAssets(true)}
                        >
                          Add
                        </Button>
                      </Box>
                    </Container>
                  )}

                  {formik.values.assets.length != 0 && (
                    <Grid container mt={2} spacing={3}>
                      {formik.values.assets.map((asset, idx) => (
                        <Grid
                          key={idx}
                          item
                          xs={12}
                          sm={5}
                          // @ts-ignore
                          md={4}
                        >
                          <Card>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                image={asset.url}
                                alt="green iguana"
                              />
                              <CardContent
                                sx={{
                                  padding: "10px 15px",
                                  paddingTop: "20px",
                                }}
                              >
                                <Typography
                                  sx={{ mb: 1.5 }}
                                  color="text.secondary"
                                >
                                  {asset.desc}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}

                      <Grid
                        item
                        xs={12}
                        sm={5}
                        // @ts-ignore
                        md={4}
                      >
                        <Card>
                          <CardActionArea
                            sx={{ backgroundColor: theme.palette.primary.main }}
                          >
                            <CardContent
                              sx={{
                                padding: "10px 15px",
                                paddingTop: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => setOpenPickAssets(true)}
                            >
                              <Typography sx={{ mb: 1.5 }} color="white">
                                Add More
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Stack mt={2} mb={5} p="5px 20px" direction="row"></Stack>
          <PickThumbnailDialog
            open={OpenPickThumbnail}
            descriptionElementRef={descriptionElementRef}
            handleClose={handleClosePickThumbnail}
            setThumbnail={(value: string) => {
              formik.setFieldValue("thumbnail", value);
            }}
          />
          <PickAssetsDialog
            open={OpenPickAssets}
            descriptionElementRef={descriptionElementRef}
            handleClose={() => setOpenPickAssets(false)}
            setThumbnail={(value: { url: string; desc: string }) => {
              formik.setFieldValue("assets", [...formik.values.assets, value]);
            }}
          />
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
            <ContentEditor />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
