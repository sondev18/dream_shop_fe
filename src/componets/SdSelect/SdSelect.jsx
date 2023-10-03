import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, SxProps } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, UseControllerProps, UseFormReturn } from 'react-hook-form';
import * as uuid from 'uuid';
import styles from './SdSelect.module.scss';

export function SdSelect(props) {
  const [options, setOptions] = useState([]);
  const [isBoolean, setIsBoolean] = useState(false);
  const [controlName, setControlName] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const { sx, value, items, sdChange, label, disabled, form, required, multiple } = props;
  let { rules, disableErrorMessage } = props;
  rules = {
    ...rules,
    required: rules?.required ?? required,
  };
  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            transform: 'translate(14px, 9px) scale(1)', // Khi chưa shink
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.75)', //Khi đã shink(đã chọn data)
            },
          },
        },
      },
    },
  });
  useEffect(() => {
    if (Array.isArray(items)) {
      setOptions(items);
      setIsBoolean(false);
    } else {
      setOptions([
        {
          value: '1',
          display: items.displayOnTrue,
        },
        {
          value: '0',
          display: items.displayOnFalse,
        },
      ]);
      setIsBoolean(true);
    }
  }, [items]);
  useEffect(() => {
    if (form) {
      setControlName(uuid.v4());
    } else {
      setControlName(uuid.v4());
    }
  }, [form]);
  useEffect(() => {
    if (form && controlName) {
      const { setValue } = form;
      if (typeof value === 'boolean') {
        setValue(controlName, value === true ? '1' : '0');
      } else {
        setValue(controlName, value ?? '');
      }
    }
  }, [value, controlName]);

  if (!!multiple) {
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      const values = typeof value === 'string' ? value.split(',') : value;
      setSelectedValues(values);
      sdChange(undefined, values );
    };
    return (
      <ThemeProvider theme={theme}>
        <FormControl sx={sx} fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            disabled={disabled}
            value={Array.isArray(value) ? value : []}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            size="small"
            renderValue={selected => {
              const vals = options?.filter(e => selected?.includes(e.value))?.map(f => f.display);
              return vals.join(', ');
            }}>
            {!rules?.required && !isBoolean && (
              <MenuItem key={'value-0'} value={''}>
                Vui lòng chọn
              </MenuItem>
            )}
            {options.map((option, index) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
                <ListItemText primary={option.display} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    );
  }
  if (form) {
    const {
      formState: { errors },
    } = form;
    const error = errors[controlName];
    let errorMessage = '';
    if (error) {
      if (error.type === 'required') {
        errorMessage = 'Dữ liệu không được để trống';
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Controller
          name={controlName}
          control={form.control}
          rules={rules}
          render={({ field }) => (
            <FormControl id={controlName} sx={sx} fullWidth error={!!errorMessage} required={!!rules?.required}>
              {label && <InputLabel>{label}</InputLabel>}
              <Select
                {...field}
                label={label}
                disabled={disabled}
                size="small"
                value={typeof value === 'boolean' ? (value === true ? '1' : '0') : !multiple ? value || '' : []}
                onChange={event => {
                  const option = options.find(e => e.value === event.target.value);
                  field.onChange(event);
                  if (!isBoolean) {
                    sdChange(option ?? undefined, option?.value );
                  } else {
                    sdChange(
                      option ?? (undefined ),
                      option?.value === '1' ? true : (option?.value === '0' ? false : undefined)
                    );
                  }
                }}>
                {!rules?.required && !isBoolean && (
                  <MenuItem key={'value-0'} value={''}>
                    Vui lòng chọn
                  </MenuItem>
                )}
                {options.map((option, index) => (
                  //fix text very long
                  <MenuItem className={styles.menuItem} key={option.value} value={option.value}>
                    {option.display}
                  </MenuItem>
                ))}
              </Select>
              {!disableErrorMessage && <FormHelperText>{errorMessage || ' '}</FormHelperText>}
            </FormControl>
          )}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, minWidth: 120, margin: 0, ...sx }} fullWidth>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          value={typeof value === 'boolean' ? (value === true ? '1' : '0') : !multiple ? value || '' : []}
          label={label}
          disabled={disabled}
          size="small"
          onChange={event => {
            const option = options.find(e => e.value === event.target.value);
            if (!isBoolean) {
              sdChange(option ?? undefined , option?.value);
            } else {
              sdChange(option ?? undefined , option?.value === '1' ? true : (option?.value === '0' ? false : undefined));
            }
          }}>
          {!rules?.required && !isBoolean && (
            <MenuItem key={'value-0'} value={''}>
              Vui lòng chọn
            </MenuItem>
          )}
          {options.map((option, index) => (
            //fix text very long
            <MenuItem className={styles.menuItem} key={option.value} value={option.value}>
              {option.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
