import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select as SelectMUI,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface SelectProps {
  label: string;
  value: any;
  options: { value: any; label: string }[];
  callBack: (event: SelectChangeEvent) => void;
}

const Select = ({ label, value, options, callBack }: SelectProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <SelectMUI
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(event) => {
            callBack(event);
          }}
        >
          {options.map(({ value, label }) => {
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </SelectMUI>
      </FormControl>
    </Box>
  );
};

export default Select;
