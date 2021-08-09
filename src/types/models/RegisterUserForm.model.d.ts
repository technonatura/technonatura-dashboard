export interface RegisterUserForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
  gender?: "male" | "female";
  roleInTechnoNatura: "student" | "mentor" | "staff";
  staffRole?: string;

  birthDate: string;

  gradeInNumber: number;
}
