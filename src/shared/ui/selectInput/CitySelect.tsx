
import city from './../../../../public/data/city.json'
import CustomAutocomplete from "./Autocomplete";



export type CountryOption = {
  name: string;
};

type CountryType = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
};


export const City = ({
    value,
  ...props
  }: CountryType) =>{

    
    return <CustomAutocomplete<CountryOption> data = {city} value = {value} {...props}/>
}