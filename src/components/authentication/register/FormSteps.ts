const FormSteps: Array<{
  label: string;
  // eslint-disable-next-line camelcase
  label_desc: string;
  step: number;
  // eslint-disable-next-line camelcase
  inputs: Array<{
    label: string;
    // eslint-disable-next-line camelcase
    input_name: string;
    InputProps?: Object;
    show: boolean;
    helperText?: string;
  }>;
}> = [
  {
    label: "Bisakah anda memberi informasi mengenai diri anda?",
    label_desc: "Data ini memudahkan kami untuk mengenali Anda.",
    step: 0,
    inputs: [
      { label: "Full Name*", input_name: "fullName", show: true },
      { label: "Username*", input_name: "username", show: true },
      { label: "Birth Day", input_name: "birthDate", show: false },
    ],
  },
  {
    label: "Gender",
    label_desc: "Data ini memudahkan kami untuk mengenali Anda.",

    step: 1,
    inputs: [{ label: "Gender", input_name: "gender", show: false }],
  },
  {
    label: "Status di TechnoNatura",
    label_desc: "Apa status mu di TechnoNatura?",

    step: 2,
    inputs: [
      { label: "Role", input_name: "roleInTechnoNatura", show: false },
      { label: "gradeInNumber", input_name: "gradeInNumber", show: false },
      { label: "startPeriod", input_name: "startPeriod", show: false },

      { label: "staffRole", input_name: "staffRole", show: false },
    ],
  },
  {
    label: "Privacy Info",
    label_desc: "We keep this data secure.",

    step: 3,
    inputs: [
      {
        label: "Email*",
        input_name: "email",
        show: true,
        helperText: "We need your email to serve reset password service",
      },
      { label: "Password", input_name: "password", show: false },
    ],
  },
];

export default FormSteps;
