import { TextField } from "@mui/material";
import {
    Controller,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";
import styles from "./SdInput.module.scss";
import { useEffect, useState } from "react";
import * as uuid from 'uuid';

export function SdInput(props) {
  const { value, form, required, extraSmall, shrink, disableErrorMessage } =
    props;
  const { sdChange, ...otherProps } = props;
  const [controlName, setControlName] = useState("");
  let { sx, rules } = props;
  sx = {
    ...sx,
  };
  rules = {
    ...rules,
    required: rules?.required ?? required,
  };
  useEffect(() => {
    if(form){
        if(!controlName){
            setControlName(uuid.v4())
        }
    }else {
        setControlName('')
    }
  },[form])
  useEffect(() => {
    if (form && controlName) {
      const { setValue } = form;
      setValue(controlName, value);
    }
  }, [value, controlName]);
  if (form) {
    const {
      formState: { errors },
    } = form;
    const error = errors[controlName]
    let errorMessage = ''
    if (error) {
        if (error.type === 'required') {
          errorMessage = 'Dữ liệu không được để trống';
        }
        if (error.type === 'maxLength') {
          errorMessage = `Nhập tối đa ${rules?.maxLength} ký tự`;
        }
        if (error.type === 'pattern') {
          errorMessage = 'Nhập không đúng định dạng';
        }
      }
    return(
        <Controller
            name={controlName}
            control={form.control}
            rules={rules}
            render={({field}) => (
                <TextField
                {...field}
                className={extraSmall ? styles.extraSmall : ''}
                sx={sx}
                fullWidth
                InputLabelProps={{shrink: !!value || value === 0 || shrink}}
                InputProps={{
                    sx: {
                        ...(extraSmall && {
                          paddingX: 0,
                        }),
                      },
                }}
                size={props.size || 'small'}
                id={controlName}
                error={!!errorMessage}
                helperText={disableErrorMessage ? "" : errorMessage || ''}
                required={!!rules?.required}
                onChange={event => {
                    field.onChange(event);
                    sdChange?.(event.target.value);
                  }}
                  {...otherProps}
                />
            )}
        />
    )
  }
  return (
    <TextField
      className={extraSmall ? styles.extraSmall : ""}
      sx={sx}
      fullWidth
      InputLabelProps={{ shrink: !!value || value === 0 || shrink }}
      InputProps={{
        sx: {
          ...(extraSmall && {
            paddingX: 0,
          }),
        },
      }}
      onChange={(event) => {
        sdChange?.(event.target.value);
      }}
      size={props.size || "small"}
      {...otherProps}
    />
  );
}
