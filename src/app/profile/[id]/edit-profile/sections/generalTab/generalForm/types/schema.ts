import { z } from "zod";


// export const InformationFormSchema = z.object({
//   username: z.string(),
//   lastName: z.string(),
//   selectYourCountry: z.string(),
//   selectYourCity: z.string(),
//   aboutMe: z.string(),
//   dateBirth: z.string(),
//   firstName: z.string(),
// });


export const InformationFormSchema = z
  .object({
    username: z
      .string()
      .min(6, "Minimum number of characters 6")
      .max(30, "Maximum number of characters 30")
      .regex(/^[a-zA-Z0-9_-]+$/, "Invalid username symbols"),
      firstName: z
      .string()
      .min(1, "Minimum number of characters 6")
      .max(50, "Maximum number of characters 50")
      .regex(
        /^[A-Z,a-z,А-Я,а-я]/,
      ),
      lastName: z
      .string()
      .min(1, "Minimum number of characters 6")
      .max(50, "Maximum number of characters 50")
      .regex(
        /^[A-Z,a-z,А-Я,а-я]/,
      ),
      // dateBirth: z
      // .string(),
      dateBirth: z.string()
      .refine((dateStr) => {
        const birthDate = new Date(dateStr);
        const today = new Date();
        if (birthDate > today) return false;
        const age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthday = (
          today.getMonth() > birthDate.getMonth() || 
          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
        );
        return hasHadBirthday ? age >= 13 : age - 1 >= 13;
      }, {
        message: "Вам должно быть не менее 13 лет",
      }),
      selectYourCountry: z.string(),
      selectYourCity: z.string(),
      aboutMe: z
      .string()
      .max(200, "Maximum number of characters 200")
      .regex(/^[A-Za-zА-Яа-яёЁ0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
        message: "Недопустимые символы",
      })
      .optional(),
      
  }
)


export type InformationFormSchemaType = z.infer<typeof InformationFormSchema>;
