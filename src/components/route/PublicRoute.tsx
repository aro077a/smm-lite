import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...restOfProps }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
