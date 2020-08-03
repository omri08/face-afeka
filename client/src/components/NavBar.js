import React from "react";
import styles from "../styles/NavBar.module.scss";
import PropTypes from "prop-types";
import logo from "../assests/logoWhite.png";
import { Avatar } from "antd";
import { Badge } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import { connect } from "react-redux";

function NavBar({ user }) {
  const { Search } = Input;
  return (
    <div className={styles.container}>
      <img src={logo} alt="afeka logo" />
      <Search
        placeholder="search friedns"
        onSearch={(value) => console.log(value)}
        className={styles.search}
      />
      <ul>
        <li>
          <Avatar src={user.avatar} />
        </li>
        <li>{user.name}</li>
        <li>Home</li>
        <li className={styles.avatar}>
          <Badge className={styles.badge} count={1}>
            <UserAddOutlined className={styles.icon} />
          </Badge>
        </li>
        <li className={styles.logOut}>Log out</li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

NavBar.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(NavBar);
