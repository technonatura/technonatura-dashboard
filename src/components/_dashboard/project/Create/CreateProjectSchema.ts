// import {} from 're'
import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
  classroomId: Yup.string().required("classroom is required"),

  title: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("First name required"),
  name: Yup.string().min(2, "Too Short!").required("First name required"),
  desc: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Description is required"),

  content: Yup.string()
    .min(2, "Too Short!")
    .max(2000, "Too Long!")
    .required("Description is required"),

  thumbnail: Yup.string().required("thumbnaik required"),
  assets: Yup.array().of(Yup.string()).required("thumbnaik required"),

  tags: Yup.array().of(Yup.string()),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Category is required"),

  draft: Yup.boolean(),
});
export interface ProjectSchemaI {
  title: string;
  name: string;
  desc: string;

  content: string;

  tags: Array<string>;
  category: string;

  draft: boolean;
  classroomId: string;
}
export default ProjectSchema;
