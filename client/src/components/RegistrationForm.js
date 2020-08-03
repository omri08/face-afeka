import React from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import Alret from "./Alert";
import styles from "../styles/RegistrationForm.module.scss";
import logo from "../assests/logo.png";
import PropTypes from "prop-types";

const RegistrationForm = ({ setAlert, register, isAuthenticated }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    register(values);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={styles.container}>
      <img src={logo} alt="afeka-logo" />
      <Alret />
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="name"
          label="Full Name"
          className={styles.form__input}
          rules={[
            {
              required: true,
              message: "Please input your Full name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          className={styles.form__input}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          className={styles.form__input}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          className={styles.form__input}
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className={styles.buttons}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.buttons__logIn}
            >
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary">
              <Link to="/">BACK</Link>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

RegistrationForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(
  RegistrationForm
);
