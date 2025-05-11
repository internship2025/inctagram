import { RadioButton } from "@/shared/ui/radiobutton/radioButton";
import s from './RadioButtonWrapper.module.css'
import { AccountType } from "./hooks/useAccountType";
import { SubscriptionType } from "./hooks/useSubscriptionType";


type Props<T extends SubscriptionType | AccountType> = {
    onValueChange: (type: T)=> void
    options: { value:  AccountType | SubscriptionType; label: string }[];
}

export function RadioButtonWrapper<T extends SubscriptionType | AccountType>({onValueChange, options}: Props<T>){

    return(
        <div className={s.box}>
        <RadioButton onValueChange={onValueChange as (value: SubscriptionType | AccountType)=> void} options={options} stylesOverride = {{direction: s.direction}}/>
      </div>
    )
}