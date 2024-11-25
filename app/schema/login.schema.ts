import * as Yup from "yup";

const createLoginSchema = (t: (key: string) => string) => {
  return Yup.object({
    email: Yup.string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
      
    password: Yup.string()
      .required(t('validation.passwordRequired'))
  });
};

export default createLoginSchema; 