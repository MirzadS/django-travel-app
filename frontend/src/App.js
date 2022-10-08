import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthPrivateRoute from "./utils/AuthPrivateRoute";

/* CONTEXT */
import { DataProvider } from "./context/DataContext";

/* CONTEXT DOBIJANJE PODATAKA */
// import { useContext } from "react";
// import DataContext from "./context/DataContext";

import AgencyRegistration from "./components/AgencyRegistration";
import NewPassword from "./components/NewPassword";
import UserRegistration from "./components/UserRegistration";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import MyTravels from "./components/MyTravels";
import PlannedTravels from "./components/PlannedTravels";
import AddTravel from "./components/AddTravel";

import Header from "./components/Header";
import UpdateTrip from "./components/UpdateTrip";

function App() {
  // const {  } = useContext(DataContext);

  return (
    <div>
      <DataProvider>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>

          {/* REGISTRACIJA - KORISNIK */}
          <Route path="/registracija/korisnik" exact>
            <UserRegistration />
          </Route>

          {/* REGISTRACIJA - AGENCIJA */}
          <Route path="/registracija/agencija" exact>
            <AgencyRegistration />
          </Route>

          {/* NOVA LOZINKA */}
          <Route path="/nova-lozinka" exact>
            <NewPassword />
          </Route>

          {/* LISTA MOJIH PUTOVANJA */}
          <AuthPrivateRoute
            component={MyTravels}
            path="/moja-putovanja"
            exact
          />

          {/* HOMEPAGE */}
          <AuthPrivateRoute component={HomePage} path="/pocetna" exact />

          {/* IZMJENA PODATAKA */}
          <AuthPrivateRoute
            component={UpdateTrip}
            path="/putovanje/:id"
            exact
          />

          {/* PLANIRANA PUTOVANJA */}
          <AuthPrivateRoute
            component={PlannedTravels}
            path="/planirana-putovanja"
            exact
          />

          {/* DODAVANJE NOVOG PUTOVANJA */}
          <AuthPrivateRoute
            component={AddTravel}
            path="/dodaj-putovanje"
            exact
          />

          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </DataProvider>
    </div>
  );
}

export default App;
