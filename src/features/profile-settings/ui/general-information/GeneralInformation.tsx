import s from "./GeneralInformation.module.css";
import { GeneralInformationForm } from "./generalForm/GeneralInformationForm";

export const GeneralInformation = () => {
  return (
    <div className={s.conteiner}>
      <div className={s.wrapperPhoto}></div>
      <div className={s.wrapperForm}>
        <GeneralInformationForm />
      </div>
    </div>
  );
};
