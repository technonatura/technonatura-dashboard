// material
import { Stack, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
      </RadioGroup>

      {(getFieldProps("roleInTechnoNatura").value === "student" ||
        getFieldProps("roleInTechnoNatura").value === "mentor") && (
        <Stack mt={2} direction={{ xs: "column", sm: "row" }} spacing={2}>
          {getFieldProps("roleInTechnoNatura").value === "student" && (
            <TextField
              fullWidth
              label="Start Period"
              {...getFieldProps("startPeriod")}
              error={Boolean(errors.startPeriod)}
              helperText={errors.startPeriod}
              name="startPeriod"
              type="number"
            />
          )}

          <FormControl
            fullWidth
            {...getFieldProps("level")}
            error={Boolean(errors.level)}
            helperText={errors.level}
            name="level"
          >
            <InputLabel id="level">Level*</InputLabel>
            <Select
              labelId="level"
              id="levelSelect"
              value={getFieldProps("level").value}
              label="Level"
              name="level"
              onChange={getFieldProps("level").onChange}
            >
              <MenuItem value="mi">Madrasah Ibtidiyah</MenuItem>
              <MenuItem value="mts">Madrasah Tsnawiyah</MenuItem>
              <MenuItem value="ma">Madrasah Aliyah</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      {getFieldProps("roleInTechnoNatura").value === "mentor" && (
        <Typography mt={1}>
          You are requesting as {getFieldProps("roleInTechnoNatura").value}
        </Typography>
      )}
    </FormControl>
  );
}
