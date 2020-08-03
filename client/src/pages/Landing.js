import React, { useEffect } from "react";
import styles from "../styles/Landing.module.scss";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import setAuthToken from "../utils/setAuthToken";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profile";
import { connect } from "react-redux";

function Landing({ isAuthenticated, userLoading, profile, getCurrentProfile }) {
  useEffect(() => {
    setAuthToken(localStorage.token);
    getCurrentProfile();
  }, []);
  if (isAuthenticated) {
    if (userLoading) return <div>Loading....</div>;
    return (
      <div className={styles.container}>
        <NavBar />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </div>
    );
  } else return <LoginPage />;
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userLoading: state.auth.loading,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Landing);
