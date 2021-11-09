import React from "react";
import { SpinnerCircular } from "spinners-react";
import Button from "../ui/Button";
import Text from "../ui/Text";
import Title from "../ui/Title";

const InstagramAPI = () => {
  const loading = false;
  return (
    <div className="insta-api">
      <div className="insta-api__title-block">
        <Title title="Подключитесь" />
        <Title title=" через Facebook" />
        <Text text="Это безопасно, мы не храним ваши данные, и вы сможете отключить сервис в любой момент." />
      </div>
      <div className="insta-api__buttons">
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
          className="-connect"
          type="submit"
          loading={loading}
        />
        <Button buttonText="Отмена" className="-cancel" />
      </div>
    </div>
  );
};

export default InstagramAPI;
