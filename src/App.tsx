import { Route, Switch } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import ProtectedRoute from "./components/route/ProtectedRoute";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <AuthLayout></AuthLayout> */}
        <HomeLayout>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </HomeLayout>
      </Switch>
    </div>
  );
}

export default App;
