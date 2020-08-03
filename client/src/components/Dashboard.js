import React from "react";
import styles from "../styles/Dashboard.module.scss";

import { Form, Input, Button } from "antd";

function Dashboard() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <h1>Update Profile</h1>
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

export default Dashboard;
