
import countries from './../../../../public/data/countries.json'
import CustomAutocomplete, { BaseOption } from "./Autocomplete";



export type CountryOption = BaseOption & {
  code: string;
};

type CountryType = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
};


export const Country = ({
    value,
  ...props
  }: CountryType) =>{

    
    return <CustomAutocomplete<CountryOption> data = {countries} value = {value} {...props}/>
}