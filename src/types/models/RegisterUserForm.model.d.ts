export interface RegisterUserForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
  gender?: "male" | "female";
  roleInTechnoNatura: "student" | "mentor";
  startPeriod: number;

  birthDate: string;

  gradeInNumber: number;
}
