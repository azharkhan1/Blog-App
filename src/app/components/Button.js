import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AppButton({ text, onClick, type }) {
  return (
    <Button variant="contained" onClick={onClick} type={type}>{text}</Button>
  );
}