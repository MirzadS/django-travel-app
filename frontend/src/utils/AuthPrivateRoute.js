import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const AuthPrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(DataContext);

  return (
    <div>
      <Route
        {...rest}
        render={() => (!token ? <Redirect to="/login" /> : <Component />)}
      />
    </div>
  );
};

export default AuthPrivateRoute;
