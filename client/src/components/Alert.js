import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert as AlretAntd } from "antd";

const Alert = ({ alerts }) => {
  if (alerts != null && alerts.length > 0) {
    console.log(alerts);
    return alerts.map((alert) => (
      <AlretAntd type="error" message={alert.msg} key={alert.id} />
    ));
  }
  return "";
};
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
