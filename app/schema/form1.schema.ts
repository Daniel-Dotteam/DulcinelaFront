import * as Yup from "yup";

const createValidationSchema = (t: (key: string) => string) => {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());

  return Yup.object({
    name: Yup.string()
      .min(2, t('validation.nameMin'))
      .max(32, t('validation.nameMax'))
      .required(t('validation.nameRequired')),
      
    last_name: Yup.string()
      .min(2, t('validation.lastNameMin'))
      .max(32, t('validation.lastNameMax'))
      .required(t('validation.lastNameRequired')),
      
    email: Yup.string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
      
    number: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, t('validation.phoneInvalid'))
      .required(t('validation.phoneRequired')),
      
    password: Yup.string()
      .min(8, t('validation.passwordMin'))
      .matches(/[a-zA-Z]/, t('validation.passwordLetter'))
      .matches(/[0-9]/, t('validation.passwordNumber'))
      .required(t('validation.passwordRequired')),
      
    birth_date: Yup.date()
      .nullable()
      .min(minDate, t('validation.birthDateMin'))
      .max(maxDate, t('validation.birthDateMax'))
      .required(t('validation.birthDateRequired')),

    marketingConsent: Yup.boolean()
      .oneOf([true], t('formFields.consentRequired'))
      .required(t('formFields.consentRequired'))
  });
};

export default createValidationSchema;