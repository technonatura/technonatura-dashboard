// import {} from 're'
import * as Yup from "yup";

const StorySchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("First name required"),
  desc: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Description is required"),

  content: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Description is required"),

  tags: Yup.array().of(Yup.string()),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Category is required"),

  visibility: Yup.string(),
});
export interface StorySchemaI {
  title: string;
  desc: string;

  content: string;

  tags: Array<string>;
  category: string;

  visibility: string;
}
export default StorySchema;
