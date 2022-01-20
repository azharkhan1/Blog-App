import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AppButton({text,onPress}) {
  return (
    <Button variant="contained" onPress={onPress}>{text}</Button>
  );
}