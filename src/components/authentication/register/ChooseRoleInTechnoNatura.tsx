// material
import { Stack, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
// ----------------------------------------------------------------------

interface ChooseRoleInTechnoNaturaI {
  formik: any;
  Branches: {
    fetched: boolean;
    message: string;
    status: string;
    branches?: Array<{ title: string; name: string; active: boolean }>;
  };
}
export default function ChooseRoleInTechnoNatura({
  formik,
  Branches,
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

      <Stack mt={3} direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth style={{ marginTop: 15 }}>
          <InputLabel id="branch">Cabang TechnoNatura</InputLabel>

          <Select
            {...getFieldProps("branch")}
            name="branch"
            fullWidth
            label="Cabang TechnoNatura"
            error={Boolean(errors.branch)}
            helperText={errors.branch}
          >
            {/* @ts-ignore */}
            {Branches.branches
              .filter((branch) => branch.active)
              .map((branch) => (
                // @ts-ignore
                <MenuItem key={branch._id} value={branch._id}>
                  {branch.title}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>{errors.branch}</FormHelperText>
        </FormControl>
      </Stack>

      {getFieldProps("roleInTechnoNatura").value === "student" && (
        <>
          <Stack mt={3} direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Tahun"
              {...getFieldProps("startPeriod")}
              error={Boolean(errors.startPeriod)}
              helperText={
                errors.startPeriod ||
                `Sejak Tahun Berapa Kamu dikelas ${
                  getFieldProps("gradeInNumber").value
                }?`
              }
              name="startPeriod"
              type="number"
              value={getFieldProps("startPeriod").value}
            />
            <TextField
              fullWidth
              helperText="Angkatan mu"
              name="startPeriod"
              type="string"
              value={`${getFieldProps("startPeriod").value}-${
                getFieldProps("startPeriod").value + 1
              }`}
              disabled
            />
          </Stack>
        </>
      )}

      {(getFieldProps("roleInTechnoNatura").value === "student" ||
        getFieldProps("roleInTechnoNatura").value === "mentor") && (
        <>
          <Stack mt={3} direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label={`${
                getFieldProps("roleInTechnoNatura").value === "mentor"
                  ? "Mengajar kelas berapa?"
                  : "Sekarang Kelas Berapa?"
              }`}
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
              label="Staff seperti apa?"
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
          Anda meminta menjadi {getFieldProps("roleInTechnoNatura").value}
        </Typography>
      )}
    </FormControl>
  );
}
