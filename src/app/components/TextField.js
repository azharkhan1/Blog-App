import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextInput({ value, onChange, placeholder, label, type }) {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}