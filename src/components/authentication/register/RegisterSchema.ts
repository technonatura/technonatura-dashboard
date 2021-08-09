// import {} from 're'
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  branch:
    Yup.string()
    .required("Branch required"),

  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name required"),

  username: Yup.string()
    .matches(
      /^[A-Za-z0-9_-]*$/,
      "Only letters, numbers, underscores, and dashes are allowed."
    )
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .required("username required"),

  gender: Yup.string().min(1, "Too Short!").required("username required"),

  roleInTechnoNatura: Yup.string()
    .min(5, "Too Short!")
    .required("username required"),
  staffRole: Yup.string()
    .when("roleInTechnoNatura", {
      is: "staff",
      then: Yup.string().required("This field is required"),
    })
    .min(5, "Too Short!"),

  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  birthDate: Yup.string().required("Please Fill Your Birth Day"),

  gradeInNumber: Yup.number()
    .min(1, "There is no grade below 1!")
    .max(12, "This is not university!")
    .required("What is the grade?"),
  startPeriod: Yup.number().when("roleInTechnoNatura", {
    is: "student",
    then: Yup.number()
      .min(new Date().getFullYear(), `The min is ${new Date().getFullYear()}`)
      .max(new Date().getFullYear(), "The max is this year.")
      .required("Sejak Tahun Berapa Kamu Bersekolah di Techno?"),
  }),
});

export default RegisterSchema;
