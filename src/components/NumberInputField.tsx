import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { parseMathExpression } from '../parsers/parseMathExp';

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
  sx?: TextFieldProps['sx'];
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  startAdornment,
  endAdornment,
  fullWidth = true,
  required = false,
  name,
  sx,
}) => {
  const [inputValue, setInputValue] = React.useState(`${value}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setInputValue(val);

    // const parsedExp = parseMathExpression(val);
    // if (!Number.isNaN(parsedExp)) {
    //   onChange(parsedExp);
    // }
  };

  const fieldRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <TextField
        variant="standard"
        name={name}
        label={label}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === 'Enter') {
            fieldRef.current?.blur();
          }
        }}
        inputRef={fieldRef}
        slotProps={{
          input: {
            onBlur: () => {
              const parsedExp = parseMathExpression(inputValue);
              if (!Number.isNaN(parsedExp)) {
                onChange(parsedExp);
                setInputValue(`${parsedExp}`);
              }
            },
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
          },
        }}
        fullWidth={fullWidth}
        disabled={disabled}
        error={error}
        helperText={helperText}
        required={required}
        sx={sx}
      />
    </>
  );
};

export default NumberInputField;
