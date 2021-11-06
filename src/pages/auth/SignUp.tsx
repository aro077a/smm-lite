import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import EyeIcon from "../../components/icon-components/EyeIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Text from "../../components/ui/Text";
import Title from "../../components/ui/Title";
import * as Yup from "yup";
import usePasswordActive from "../../hooks/usePasswordActive";
import EyeHideIcon from "../../components/icon-components/EyeIconHide";
import { register } from "../../redux/features/authSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SpinnerCircular } from "spinners-react";
import star from "../../assets/icons/star.svg";
import line from "../../assets/icons/line.svg";
import signupMark from "../../assets/icons/signup-mark.svg";

const SignUp = () => {
  const { isPassActive, toggleActive } = usePasswordActive();
  const { signUpError, loading } = useSelector(
    ({ auth }: RootState) => ({
      signUpError: auth.signUpError,
      loading: auth.loading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleSubmitForm = (values: any) => {
    dispatch(register(values));
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Неверный адрес электронной почты")
      .required("Обязательное поле"),
    password: Yup.string()
      .required("Пожалуйста введите ваш пароль")
      .min(6, "Слишком короткий,не меньше 6 символов"),
  });

  return (
    <div className="signUp">
      <div className="signUp__title-block">
        <img src={star} alt="star" className="signUp__title-block--star" />
        <img src={line} alt="line" className="signUp__title-block--line" />
        <img
          src={signupMark}
          alt="signup-mark"
          className="signUp__title-block--mark"
        />
        <Title title="Регистрация" className="signUp__title-block--title" />
      </div>
      <Text
        text="Автоматизируйте управление социальными сетями, 
              чтобы освободить время для более важных дел."
        className="signUp__description--text"
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
      >
        {({ errors, touched, handleChange, values, dirty, isValid }) => (
          <>
            <Form className="signUp__form">
              <Input
                htmlFor="Email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                errorsMessage={
                  (errors.email && errors.email) || signUpError[0]?.message
                }
              />
              <Input
                htmlFor="Пароль"
                label="Пароль"
                type={isPassActive ? "text" : "password"}
                name="password"
                value={values.password}
                icon={
                  isPassActive ? (
                    <EyeHideIcon
                      className="signUp__form--icon"
                      onClick={toggleActive}
                    />
                  ) : (
                    <EyeIcon
                      className="signUp__form--icon"
                      onClick={toggleActive}
                    />
                  )
                }
                onChange={handleChange}
                errorsMessage={errors.password && errors.password}
              />

              <div className="signUp__description">
                <Text
                  text="Уже зарегистрированы?"
                  className="signUp__description--info"
                />
                &ensp;
                <Link to="/signIn" className="signUp__description--link">
                  Войти
                </Link>
              </div>
              <Button
                buttonText={
                  loading ? (
                    <SpinnerCircular
                      size={23}
                      thickness={148}
                      speed={137}
                      color="rgba(255, 255, 255, 0.94)"
                      secondaryColor="rgba(57, 172, 112, 0)"
                    />
                  ) : (
                    "Зарегистрироваться"
                  )
                }
                className="signUp__button"
                type="submit"
                loading={loading}
                buttonType={!(dirty && isValid)}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
