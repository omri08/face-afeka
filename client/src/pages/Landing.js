import React, { useEffect } from "react";
import styles from "../styles/Landing.module.scss";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import Profile from "./Profile";
import SearchPage from "./SearchPage";
import setAuthToken from "../utils/setAuthToken";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profile";
import { connect } from "react-redux";

function Landing({
  isAuthenticated,
  userLoading,
  getCurrentProfile,
  profileLoading,
}) {
  useEffect(() => {
    if (!userLoading) {
      setAuthToken(localStorage.token);
      getCurrentProfile();
    }
  }, [userLoading]);

  if (isAuthenticated) {
    if (userLoading || profileLoading) return <div>Loading....</div>;
    return (
      <div className={styles.container}>
        <NavBar />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/search/:fields" component={SearchPage} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </div>
    );
  } else return <LoginPage />;
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userLoading: PropTypes.bool.isRequired,
  profileLoading: PropTypes.bool.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userLoading: state.auth.loading,
  profileLoading: state.profile.loading,
});
export default connect(mapStateToProps, { getCurrentProfile })(Landing);
