import { useState } from "react";
import InstagramAPI from "./InstagramAPI";
import InstagramAuth from "./InstagramAuth";
import InstagramAuthForm from "./InstagramAuthForm";

const InstagramAuthContainer = () => {
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
        <InstagramAuthForm />
      )}
    </div>
  );
};

export default InstagramAuthContainer;
