import * as React from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";
import { useRouter } from "next/router";

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
  IconButton,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { theme } from "theme";

import { useFormik, Form, FormikProvider } from "formik";

import toast from "react-hot-toast";

import ProjectSchema, { ProjectSchemaI } from "./CreateProjectSchema";
import { ClassroomInterface } from "types/models/classroom.model";
import UploadProject from "./uploadProject";
import EditProject from "./editProject";

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

export default function CreateProjectComponent(props: {
  values?: ProjectSchemaI;
}) {
  const router = useRouter();

  const [selectedAsset, setSelectedAsset] = React.useState<{
    url: string;
    desc: string;
    index: number;
  }>({
    url: "",
    desc: "",
    index: -1,
  });
  const [CreatedProject, setCreatedProject] = React.useState(false);
  const [saved, setSaved] = React.useState(true);

  const [OpenPickThumbnail, setOpenPickThumbnail] = React.useState(false);
  const [OpenPickAssets, setOpenPickAssets] = React.useState(false);

  const authState = useSelector((state: RootStore) => state.user);
  const [expanded, setExpanded] = React.useState<string>("");

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
    initialValues: props.values
      ? { ...props.values }
      : {
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
    onSubmit(values, e) {
      // @ts-ignore
      onSubmit(values);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  async function onSubmit() {
    const error = await formik.validateForm();

    if (!props.values) {
      try {
        const uploadedProject = await UploadProject(
          formik.values,
          authState.token
        );
        if (uploadedProject.project && uploadedProject.status == "success") {
          toast.success(uploadedProject.message);
          setCreatedProject(true);
          setTimeout(() => {
            // @ts-ignore
            window.location.href = `https://tn-project.vercel.app/p/${uploadedProject.project.name}`;
          }, 3000);
        } else {
          toast.error(uploadedProject.message);
        }

        if (uploadedProject.status == "error" && uploadedProject.errors) {
          if (Object.keys(uploadedProject.errors).length >= 1) {
            // @ts-ignore
            formik.setErrors(uploadedProject.errors);
          }
          toast.error(uploadedProject.message);
        }
      } catch (err) {}
    } else {
      try {
        const editedProject = await EditProject(
          formik.values,
          authState.token,
          // @ts-ignore
          router.query.projectName
        );
        if (editedProject.project && editedProject.status == "success") {
          toast.success(editedProject.message);
          setSaved(true);
        } else {
          toast.error(editedProject.message);
        }

        if (editedProject.status == "error" && editedProject.errors) {
          if (Object.keys(editedProject.errors).length >= 1) {
            // @ts-ignore
            formik.setErrors(editedProject.errors);
          }
          toast.error(editedProject.message);
        }
      } catch (err) {}
    }

    formik.setSubmitting(false);
  }

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
  }, [formik.values.classroomId, classrooms]);

  React.useEffect(() => {
    // const regex = /\s/i;
    if (!formik.touched.name) {
      const titleCopy = formik.values.title.replaceAll(" ", "-");
      formik.setFieldValue("name", titleCopy);
    }
  }, [formik.values.title]);

  React.useEffect(() => {
    if (saved) {
      setSaved(false);
    }
  }, [formik.values]);

  const insertTagToForm = (value: string) => {
    if (value.length > 3) {
      formik.setFieldValue("tags", [...formik.values.tags, value.trim()]);
    } else {
      toast.error("Length of tag should be greater than 3");
    }
  };

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case ",":
      case " ": {
        event.preventDefault();
        event.stopPropagation();
        insertTagToForm(event.target.value);

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
        `${process.env.NEXT_PUBLIC_SERVER}/api/classrooms/?username=${
          // @ts-ignore
          authState.me.username
        }&grade=${
          // @ts-ignore
          authState.me?.roleInTechnoNatura.grade
        }&gradePeriod=${
          // @ts-ignore
          authState.me?.roleInTechnoNatura.startPeriod
        }${props.values ? "&allClassrooms=true" : ""}`
      );

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
        data: [],
      });
    }
  }

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

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

  if (
    !classrooms.loading &&
    classrooms.fetched &&
    classrooms.data.length === 0
  ) {
    return (
      <Container>
        <Alert severity="info">
          <AlertTitle>Nothing&apos;s here..</AlertTitle>
          Looks like you&apos;ve submitted all of your projects, you don&apos;t
          need to submit any project again! But stay tuned!
        </Alert>
      </Container>
    );
  }

  if (CreatedProject) {
    return (
      <Alert severity="success">
        <AlertTitle>Successfully Created App</AlertTitle>
        Please wait a second for us to direct you to your project page!
      </Alert>
    );
  }

  if (isSubmitting) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, marginTop: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3">
              {props.values ? "Edit Project" : "Create Project"}{" "}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                type="submit"
              >
                {props.values ? "Save" : "Publish"}
              </LoadingButton>
              {props.values && (
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    sx={{ width: 50, height: 50, ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
          <Typography variant="h5" color="grayText">
            Create project and post it to Internet!
          </Typography>
        </Box>
        <Container sx={{ mt: 10 }}>
          <Stack
            sx={{ color: "grey.500" }}
            spacing={2}
            justifyContent="center"
            direction="row"
            alignItems="center"
          >
            <CircularProgress color="primary" />
            <Typography>Posting Your Project, please wait.</Typography>
          </Stack>
        </Container>
        ;
      </Container>
    );
  }
  // eslint-disable-next-line no-unused-vars
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Container maxWidth="xl">
          <Box sx={{ pb: 5, marginTop: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3">
                {props.values ? "Edit Project" : "Create Project"}
              </Typography>
              {props.values ? (
                <Stack direction="row" justifyContent="space-between">
                  <LoadingButton
                    loading={isSubmitting}
                    variant="contained"
                    color={saved ? "secondary" : "primary"}
                    type="submit"
                    disabled={saved}
                  >
                    {saved ? "Saved in DB" : "Save"}
                  </LoadingButton>
                  <IconButton
                    sx={{ ml: 2, width: 50, height: 50 }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ) : (
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                >
                  Publish
                </LoadingButton>
              )}
            </Stack>
            <Typography variant="h5" color="grayText">
              Create project and post it to Internet!
            </Typography>
          </Box>
          {props.values && (
            <Alert severity="info">
              <AlertTitle>View your Project</AlertTitle>
              You can view your project on{" "}
              <Link href={`https://tn-project.vercel.app/p/${values.name}`}>
                https://tn-project.vercel.app/p/{values.name}
              </Link>
            </Alert>
          )}

          <Box sx={{ width: "100%", typography: "body1" }}>
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
                    disabled={isSubmitting}
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
                                <Typography
                                  sx={{ mt: 3, color: "text.secondary" }}
                                >
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
                              <Typography
                                sx={{ mt: 3, color: "text.secondary" }}
                              >
                                You haven&apos;t uploaded any project assets
                                yet.
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
                                onClick={async () => {
                                  await setSelectedAsset({
                                    url: asset.url,
                                    desc: asset.desc,
                                    index: idx,
                                  });
                                  setOpenPickAssets(true);
                                }}
                              >
                                <Card>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      image={asset.url}
                                      alt="Photo Url"
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
                                  sx={{
                                    backgroundColor: theme.palette.primary.main,
                                  }}
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
                    formik.setFieldValue("assets", [
                      ...formik.values.assets,
                      value,
                    ]);
                  }}
                  setDelete={() => {
                    formik.setFieldValue("assets", [
                      ...formik.values.assets.filter(
                        (_, idx) => idx !== selectedAsset.index
                      ),
                    ]);
                  }}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                />
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Tag Rules</AlertTitle>
                  Tag naming should follow this regex rule:{" "}
                  <strong>/^[a-zA-Z0-9._-]*$/</strong> . Seperate with{" "}
                  <Chip label="," /> to create new tag . Tag length should be
                  above 3
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
                        <Chip key={index} label={option} sx={{ m: "0 2px" }} />
                      ))
                    }
                    noOptionsText={<p>No Option</p>}
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
                            <MenuItem
                              key={classroom.name}
                              value={classroom._id}
                            >
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
                    Your Project Content.
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ContentEditor
                    setContent={(value: string) =>
                      formik.setFieldValue("content", value)
                    }
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>
        </Container>
      </Form>
    </FormikProvider>
  );
}
