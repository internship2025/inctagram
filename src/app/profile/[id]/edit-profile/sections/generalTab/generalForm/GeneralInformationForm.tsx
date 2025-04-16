import { Input } from "@/shared/ui/input/input";
import s from "./GeneralInformationForm.module.css";
import { DatePicker } from "@/shared/ui/datePicker/DatePicker";
import { TextArea } from "@/shared/ui/textArea/textArea";
import { Button } from "@/shared/ui/button/button";
import { Controller } from "react-hook-form";
import { useInformationForm } from "@/features/auth/ui/hooks/useInformationForm";
import { Country } from "@/shared/ui/selectInput/CoutrySelect";
import { City } from "@/shared/ui/selectInput/CitySelect";
import { NotificationModal } from "@/features/auth/ui/statusModalModal/StatusModal";
import Link from "next/link";

export const GeneralInformationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    trigger,
    signupHandler,
    notification,
    setNotification,
  } = useInformationForm();

  return (
    <div>
      <div className={s.wrapper}>
        <form onSubmit={handleSubmit(signupHandler)}>
          <div className={s.inputWrapper}>
            <Input
              error={errors?.username?.message}
              fullWidth
              label="Username"
              required
              {...register("username", {
                onChange: () => trigger("username"),
              })}
            />
            {errors.username && (
              <span className={s.error}>{errors.username.message}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <Input
              error={errors?.firstName?.message}
              fullWidth
              label="First Name"
              required
              {...register("firstName", {
                onChange: () => trigger("firstName"),
              })}
            />
            {errors.firstName && (
              <span className={s.error}>{errors.firstName.message}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <Input
              error={errors?.lastName?.message}
              fullWidth
              label="Last Name"
              required
              {...register("lastName", {
                onChange: () => trigger("lastName"),
              })}
            />
            {errors.lastName && (
              <span className={s.error}>{errors.lastName.message}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <Controller
              name="dateBirth"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <DatePicker
                    label="Date of birth"
                    error={errors.dateBirth?.message}
                    selectedDate={field.value ? new Date(field.value) : null}
                    fullWidth
                    onDateChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                  {errors.dateBirth && (
                    <span className={s.error}>{errors.dateBirth.message} <Link
                   style={{ textDecoration: 'underline' }} href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link></span>
                  )}
                </div>
              )}
            />
          </div>
          <div className={s.containerSelects}>
            <Controller
              name="selectYourCountry"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Country
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Country"
                />
              )}
            />
            <Controller
              name="selectYourCity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <City
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Сity"
                />
              )}
            />
          </div>
          <div className={s.wrapperTextAria}>
            <TextArea
              error={errors?.aboutMe?.message}
              label="About Me"
              {...register("aboutMe", {
                onChange: () => trigger("aboutMe"),
              })}
            />
            {errors.aboutMe && (
              <span className={s.error}>{errors.aboutMe.message}</span>
            )}
          </div>
          <div className={s.btn}>
            <Button>Save Changes</Button>
          </div>
        </form>
      </div>
      <NotificationModal
        message={notification.message}
        open={notification.isOpen}
        onClose={() => setNotification({ message: "", isOpen: false })}
      />
    </div>
  );
};
