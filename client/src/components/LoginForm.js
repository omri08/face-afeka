import React from "react";
import logo from "../assests/logo.png";
import styles from "../styles/LoginForm.module.scss";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

function LoginForm({ login, isAuthenticated }) {
  const onFinish = ({ email, password }) => {
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <img src={logo} alt="afeka-logo" />
      <Form name="login" className={styles.form} onFinish={onFinish}>
        <Form.Item
          className={styles.form__input}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          className={styles.form__input}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <div className={styles.buttons}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.buttons__logIn}
            >
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary">
              <Link to="/signUp"> Sign Up</Link>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(LoginForm);
