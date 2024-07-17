import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const MuiInput = forwardRef(function MuiInput(
  {
    id,
    label,
    variant = "outlined",
    className = "w-auto",
    size = "small",
    ...props
  },
  ref
) {
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      className={`text-white ${className}`}
      inputRef={ref}
      size={size}
      autoComplete="off"
      {...props}
      InputLabelProps={{
        style: {
          fontSize: "11pt",
          color: "black",
        },
      }}
    />
  );
});

export default MuiInput;
