import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import EyeIcon from "../../components/icon-components/EyeIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Text from "../../components/ui/Text";
import Title from "../../components/ui/Title";
import usePasswordActive from "../../hooks/usePasswordActive";
import EyeHideIcon from "../../components/icon-components/EyeIconHide";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authSlice";
import signinArrow from "../../assets/icons/signin-arrow.svg";
import signinLine from "../../assets/icons/signin-line.svg";
import signinBottomLine from "../../assets/icons/signin-bottom-line.svg";
import { RootState } from "../../redux/store";
import { SpinnerCircular } from "spinners-react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { IAuthForm } from "./models";
import { SignInSchema } from "../../utils/validationSchema";

const SignIn = () => {
  const { isPassActive, toggleActive } = usePasswordActive();
  const dispatch = useDispatch();

  const { signInError, loading } = useSelector(
    ({ auth }: RootState) => ({
      signInError: auth.signInError,
      loading: auth.loading,
    }),
    shallowEqual
  );

  const handleSubmitForm = (values: IAuthForm) => {
    dispatch(login(values));
  };

  return (
    <AuthLayout>
      <div className="signIn">
        <div className="signIn__title-block">
          <img
            src={signinArrow}
            alt="signin-arrow"
            className="signIn__title-block--arrow"
          />
          <img
            src={signinLine}
            alt="signin-line"
            className="signIn__title-block--line"
          />
          <img
            src={signinBottomLine}
            alt="signIn__title-bottom-line"
            className="signIn__title-block--bottom-line"
          />
          <Title title="Войти" className="signIn__title-block--title" />
        </div>
        <Text
          text="Автоматизируйте управление социальными сетями, 
              чтобы освободить время для более важных дел."
          className="signIn__description--text"
        />
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            handleSubmitForm(values);
          }}
        >
          {({ errors, handleChange, values, dirty, isValid }) => (
            <Form className="signIn__form">
              <Input
                htmlFor="Email"
                label="Email"
                type="email"
                name="username"
                value={values.username}
                onChange={handleChange}
                errorsMessage={
                  (errors.username && errors.username) ||
                  signInError[0]?.message
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
                      className="password-icon"
                      onClick={toggleActive}
                    />
                  ) : (
                    <EyeIcon className="password-icon" onClick={toggleActive} />
                  )
                }
                onChange={handleChange}
                errorsMessage={errors.password || signInError[0]?.message}
              />

              <div className="signIn__description">
                <Text
                  text="Впервые на нашем сервисе?"
                  className="signIn__description--info"
                />
                &ensp;
                <Link to="/signup" className="signIn__description--link">
                  Регистрация
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
                    "Войти"
                  )
                }
                // className="-signIn"
                type="submit"
                loading={loading}
                buttonType={!(dirty && isValid)}
              />
              <div className="signIn__remember">
                <input
                  type="checkbox"
                  id="remember"
                  className="signIn__remember--checkbox"
                />
                <label htmlFor="remember">Запомнить меня</label>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
