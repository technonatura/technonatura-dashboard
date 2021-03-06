import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField, CardMedia, Alert, Fade } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useFormik } from "formik";
import * as Yup from "yup";

import { FilePond, registerPlugin } from "react-filepond";
import * as blobUtil from "blob-util";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import styled from "@emotion/styled";

const FilePondStyled = styled(FilePond)`
  width: 100%;
`;

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PickThumbnail({
  open,
  handleClose,
  setThumbnail,
}: {
  open: boolean;
  handleClose: () => void;
  setThumbnail: (value: string) => void;
}) {
  const [uploading, setuploading] = React.useState<boolean>();

  const [tab, setTab] = React.useState(0);
  const [alert, setAlert] = React.useState(false);

  const handleChange = (event: any, newTab: number) => {
    setTab(newTab);
  };

  const [files, setFiles] = React.useState([]);

  // eslint-disable-next-line no-unused-vars
  const formik = useFormik<{ url: string }>({
    initialValues: {
      url: "",
    },

    validationSchema: Yup.object().shape({
      url: Yup.string().url().required(),
    }),
    onSubmit: () => {},
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
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title">
        Upload Project Thumbnail
      </DialogTitle>
      <DialogContent dividers>
        <Fade in={true}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please fill the input.
          </Alert>
        </Fade>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Upload" {...a11yProps(0)} />
            <Tab label="Url" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <FilePondStyled
            files={files}
            allowMultiple={false}
            allowFileEncode={true}
            allowFileSizeValidation
            allowImageCrop
            maxFileSize="3MB"
            //   @ts-ignore
            onupdatefiles={setFiles}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            allowFileTypeValidation
            acceptedFileTypes={["image/png", "image/jpeg"]}
            fileSizeBase={1000}
            onaddfilestart={() => setuploading(true)}
            onaddfile={(error, file) => {
              setuploading(false);

              // if (files[0]) {
              //   console.log(
              //     // @ts-ignore
              //     blobUtil.base64StringToBlob(files[0].getFileEncodeDataURL())
              //   );
              // }
            }}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CardMedia
            component="img"
            height="140"
            sx={{ mt: 2, borderRadius: "10px" }}
            image={getFieldProps("url").value}
            alt="green iguana"
          />
          <TextField
            style={{ marginTop: 15 }}
            fullWidth
            label="Photo Url"
            {...getFieldProps("url")}
            error={Boolean(
              // @ts-ignore
              touched["url"] && errors["url"]
            )}
            // @ts-ignore
            helperText={
              /* eslint-disable */

              errors["url"]

              /* eslint-enable */
            }
            disabled={isSubmitting}
          />
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={async () => {
            // setThumbnail()

            // if url
            if (tab) {
              if (formik.touched.url && !formik.errors["url"]) {
                setThumbnail(formik.values.url);
                handleClose();
              }
              setAlert(true);
            } else {
              if (files[0]) {
                //   @ts-ignore
                setThumbnail(files[0].getFileEncodeDataURL());
                handleClose();
              }
              setAlert(true);
            }
          }}
          loading={uploading}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
