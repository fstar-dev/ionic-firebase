import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { IonApp, IonRouterOutlet, IonLabel, IonSpinner } from "@ionic/react";

import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import TabOneDetailPage from "./pages/TabOneDetailPage";

import { inject, observer } from "mobx-react";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.store.authCheckComplete ? (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <IonSpinner name="circles" />
      </div>
    ) : (
      <Router>
        <IonApp>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              render={() => <Redirect to="/home" />}
            />
            <Route path="/login" component={LoginPage} />
            <IonRouterOutlet>
              <Route path="/register" component={RegistrationPage} />
              <PrivateRoute path="/home" component={HomePage} />
              <PrivateRoute
                path="/tab1-detail/:id"
                component={TabOneDetailPage}
              />
            </IonRouterOutlet>
          </Switch>
        </IonApp>
      </Router>
    );
  }
}

export default inject("store")(observer(App));
