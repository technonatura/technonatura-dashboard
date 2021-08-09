// material
import { Stack, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

// ----------------------------------------------------------------------

interface ChooseRoleInTechnoNaturaI {
  formik: any;
}
export default function ChooseRoleInTechnoNatura({
  formik,
}: ChooseRoleInTechnoNaturaI) {
  const { errors, getFieldProps } = formik;
  return (
    <FormControl
      component="fieldset"
      {...getFieldProps("roleInTechnoNatura")}
      error={Boolean(errors.roleInTechnoNatura)}
      // @ts-ignore
      helperText={errors.roleInTechnoNatura}
    >
      <FormLabel component="legend">Role in TechnoNatura*</FormLabel>
      <RadioGroup row aria-label="roleInTechnoNatura" name="roleInTechnoNatura">
        <FormControlLabel
          value="student"
          control={<Radio />}
          label="Student"
          checked={getFieldProps("roleInTechnoNatura").value === "student"}
        />
        <FormControlLabel
          value="mentor"
          control={<Radio />}
          label="Mentor"
          checked={getFieldProps("roleInTechnoNatura").value === "mentor"}
        />
        <FormControlLabel
          value="staff"
          control={<Radio />}
          label="Staff"
          checked={getFieldProps("roleInTechnoNatura").value === "staff"}
        />
      </RadioGroup>

      {(getFieldProps("roleInTechnoNatura").value === "student" ||
        getFieldProps("roleInTechnoNatura").value === "mentor") && (
        <>
          <Stack mt={3} direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="What is the Grade now?"
              {...getFieldProps("gradeInNumber")}
              error={Boolean(errors.gradeInNumber)}
              helperText={errors.gradeInNumber}
              name="gradeInNumber"
              type="number"
            />
          </Stack>
        </>
      )}

      {getFieldProps("roleInTechnoNatura").value === "staff" && (
        <>
          <Stack mt={3} direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="What is the staff role?"
              {...getFieldProps("staffRole")}
              error={Boolean(errors.staffRole)}
              helperText={errors.staffRole}
              name="staffRole"
              type="string"
            />
          </Stack>
        </>
      )}

      {(getFieldProps("roleInTechnoNatura").value === "mentor" ||
        getFieldProps("roleInTechnoNatura").value === "staff") && (
        <Typography mt={1}>
          You are requesting as {getFieldProps("roleInTechnoNatura").value}
        </Typography>
      )}
    </FormControl>
  );
}
