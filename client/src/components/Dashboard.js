import React from "react";
import styles from "../styles/Dashboard.module.scss";
import Alert from "../components/Alert";
import { updateProfile } from "../actions/profile";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";

function Dashboard({ updateProfile }) {
  const onFinish = (values) => {
    updateProfile(values);
  };

  return (
    <div className={styles.container}>
      <h1>Update Profile</h1>
      <Alert />
      <Form onFinish={onFinish} className={styles.form}>
        <Form.Item name="company" label="Company">
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
        <Form.Item name="bio" label="Bio">
          <Input.TextArea />
        </Form.Item>
        <Button type="primary" htmlType="submit" className={styles.submit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
Dashboard.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(Dashboard);
