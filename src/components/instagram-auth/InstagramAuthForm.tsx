import { Form, Formik } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import usePasswordActive from "../../hooks/usePasswordActive";
import { IAuthForm } from "../../pages/auth/models";
import { instagramLogin } from "../../redux/features/instagramAuthSlice";
import { RootState } from "../../redux/store";
import { InstagramSchema } from "../../utils/validationSchema";
import EyeIcon from "../icon-components/EyeIcon";
import EyeHideIcon from "../icon-components/EyeIconHide";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Text from "../ui/Text";
import Title from "../ui/Title";

const InstagramAuthForm = () => {
  const { isPassActive, toggleActive } = usePasswordActive();

  const dispatch = useDispatch();

  const { instaAuthError, loading } = useSelector(
    ({ instagramAuth }: RootState) => ({
      instaAuthError: instagramAuth.instaAuthError,
      loading: instagramAuth.loading,
    }),
    shallowEqual
  );

  const handleSubmitInstagramForm = (values: IAuthForm) => {
    dispatch(instagramLogin(values));
  };

  return (
    <div className="instaAuthForm">
      <div className="instaAuthForm__title-block">
        <Title title="Введите логин и пароль" />
        <Text text="Это безопасно, мы не храним ваши данные, и вы сможете отключить сервис в любой момент." />
      </div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={InstagramSchema}
        onSubmit={(values) => {
          handleSubmitInstagramForm(values);
        }}
      >
        {({ errors, touched, handleChange, values, dirty, isValid }) => (
          <Form className="instaAuthForm__form-block">
            <Input
              htmlFor="username"
              label="Email"
              type="username"
              name="username"
              value={values.username}
              onChange={handleChange}
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
              errorsMessage={errors.password || instaAuthError[0]?.message}
            />
            <div className="instaAuthForm__form-block__buttons">
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
                    "Подключить"
                  )
                }
                type="submit"
                loading={loading}
                buttonType={!(dirty && isValid)}
              />
              <Button buttonText="Отмена" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InstagramAuthForm;
