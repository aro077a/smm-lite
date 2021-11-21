import { Switch } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout";
import ProtectedRoute from "./components/route/ProtectedRoute";
import PublicRoute from "./components/route/PublicRoute";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute path="/signup" exact component={SignUp} />
        <PublicRoute path="/signin" exact component={SignIn} />
        <HomeLayout>
          <ProtectedRoute exact path="/" component={Home} />
        </HomeLayout>
      </Switch>
    </div>
  );
}

export default App;
