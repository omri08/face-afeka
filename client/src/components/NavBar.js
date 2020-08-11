import React, { useState } from "react";
import styles from "../styles/NavBar.module.scss";
import PropTypes from "prop-types";
import logo from "../assests/logoWhite.png";
import { Avatar, Badge, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
function NavBar({ user, logout, loading }) {
  const { Search } = Input;
  const histroy = useHistory();

  function exit() {
    logout();
    histroy.replace("/");
  }
  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <img src={logo} alt="afeka logo" />
      <Search
        placeholder="search friends"
        onSearch={(value) => histroy.replace(`/search/${value}`)}
        className={styles.search}
      />
      <ul>
        <li>
          <Link to="/dashboard">
            <Avatar src={user.avatar} />
          </Link>
        </li>
        <li>
          <Link to={`/profile/${user._id}`}>{user.name}</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.avatar}>
          <Badge className={styles.badge} count={1}>
            <UserAddOutlined className={styles.icon} />
          </Badge>
        </li>
        <li onClick={exit} className={styles.logOut}>
          Log out
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { logout })(NavBar);
