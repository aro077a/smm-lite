import { useState } from "react";
import { InstagramAuthContainerProps } from "../models";
import InstagramAPI from "./InstagramAPI";
import InstagramAuth from "./InstagramAuth";
import InstagramAuthForm from "./InstagramAuthForm";

const InstagramAuthContainer = ({
  togglePopupClose,
}: InstagramAuthContainerProps) => {
  const [authType, setAuthType] = useState("withCredentials");

  const handleOpenForm = () => {
    setAuthType("form");
  };

  const handleOpenAPIAuth = () => {
    setAuthType("apiAuth");
  };
  return (
    <div>
      {authType === "withCredentials" ? (
        <InstagramAuth
          handleOpenForm={handleOpenForm}
          handleOpenAPIAuth={handleOpenAPIAuth}
        />
      ) : authType === "apiAuth" ? (
        <InstagramAPI />
      ) : (
        <InstagramAuthForm togglePopupClose={togglePopupClose} />
      )}
    </div>
  );
};

export default InstagramAuthContainer;
