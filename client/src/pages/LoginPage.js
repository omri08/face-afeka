import React from "react";
import styles from "../styles/LoginPage.module.scss";
import RegistrationForm from "../components/RegistrationForm";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/signUp" component={RegistrationForm} />
      </Switch>
    </div>
  );
}

export default LoginPage;
