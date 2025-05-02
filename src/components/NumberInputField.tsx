import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface NumberInputFieldProps {
  label?: string;
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  name?: string;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  precision,
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
  startAdornment,
  endAdornment,
  fullWidth = true,
  required = false,
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow empty string to temporarily show
    if (val === '') {
      onChange(NaN);
      return;
    }

    let parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      if (precision !== undefined) {
        parsed = parseFloat(parsed.toFixed(precision));
      }
      if (min !== undefined && parsed < min) parsed = min;
      if (max !== undefined && parsed > max) parsed = max;
      onChange(parsed);
    }
  };

  return (
    <TextField
      type="number"
      name={name}
      label={label}
      value={value === undefined || isNaN(Number(value)) ? '' : value}
      onChange={handleChange}
      inputProps={{
        min,
        max,
        step,
        readOnly,
      }}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      helperText={helperText}
      required={required}
    />
  );
};

export default NumberInputField;
