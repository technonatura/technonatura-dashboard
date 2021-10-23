// import {} from 're'
import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
  classroomId: Yup.string().required("classroom is required"),

  title: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("First name required"),
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]*$/,
      "Only letters, numbers, underscores, dashes, and periods are allowed."
    )
    .min(2, "Too Short!")
    .required("First name required"),
  desc: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Description is required"),

  content: Yup.string()
    .min(2, "Too Short!")
    .max(2000, "Too Long!")
    .required("Description is required"),

  thumbnail: Yup.string().required("thumbnail required"),
  assets: Yup.array().of(Yup.object()).required("assets required"),

  tags: Yup.array().of(Yup.string()),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Category is required"),

  draft: Yup.boolean(),
  branch: Yup.boolean(),
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
  branch: string;
  thumbnail: string;

  assets: Array<{ url: string; desc: string }>;
}
export default ProjectSchema;
