import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";

function Landing({ isAuthenticated }) {
  if (isAuthenticated)
    return (
      <div className="container">
        <NavBar />
        <MainPage />
      </div>
    );
  else return <LoginPage />;
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
