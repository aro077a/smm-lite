import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный адрес электронной почты")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Пожалуйста введите ваш пароль")
    .min(6, "Слишком короткий,не меньше 6 символов"),
});

export const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .email("Неверный адрес электронной почты")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Пожалуйста введите ваш пароль")
    .min(6, "Слишком короткий,не меньше 6 символов"),
});

export const InstagramSchema = Yup.object().shape({
  username: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Пожалуйста введите ваш пароль"),
});
