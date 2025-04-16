import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SelectArrowIcon } from "./SelectArrowIcon";

export type BaseOption = {
  name: string;
  code?:string
};

type CountrySelectProps<T extends BaseOption> = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  data: T[];
};

export default function CustomAutocomplete<T extends BaseOption>({
  value = '',
  onValueChange,
  placeholder,
  data,
}: CountrySelectProps<T>) {
 

  return (
    <Autocomplete
      sx={{
        width: "100%",
        border: "1px solid var(--color-dark-300)",
        maxWidth: "350px",
        borderRadius: "2px",
        "& .MuiAutocomplete-popupIndicator": {
          transition: "transform 0.2s ease-in-out",
          transform: "rotate(0deg)",
        },
        "& .MuiAutocomplete-popupIndicatorOpen": {
          transform: "rotate(180deg)",
        },
        "& .MuiOutlinedInput-root": {
          padding: "0",
        },
        "& input": {
          color: "var(--color-light-900)",
        },

        "& .MuiInputBase-input::placeholder": {
      opacity: 1, 
      color: "var(--color-light-900)", 
      fontSize: "var(--font-size-m)", 
        }
      }}
      freeSolo
      forcePopupIcon={true}
      options={data}
      autoHighlight
      clearIcon={null}
      value={value}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          onValueChange(newValue);
        } else if (newValue) {
          onValueChange(newValue.name);
        } else {
          onValueChange('');
        }
      }}
      popupIcon={<SelectArrowIcon />}
      
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        
        return (
          <Box
            key={key}
            component="li"
            sx={{
              "& > img": { mr: 2, flexShrink: 0 },
              background: "#4C4C4C",
              "&:hover": {
                backgroundColor: "var(--color-dark-500) !important",
              },
            }}
            {...optionProps}
          >
            {option?.code && (
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
            )}

            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "new-password",
            },
          }}
        />
      )}
      slotProps={{
        listbox: {
          sx: {
            maxHeight: 300,
            background: "var(--color-dark-300)",
            color: "var(--color-light-100)",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#3A3A3A",
              borderRadius: "5px",
              margin: "4px 0",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#6B6B6B",
              borderRadius: "5px",
              border: "2px solid #3A3A3A",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#888888",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "var(--color-dark-500) var(--color-dark-300)",
          },
        },
      }}
    />
  );
}
