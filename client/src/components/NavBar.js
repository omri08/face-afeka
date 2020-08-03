import React from "react";
import styles from "../styles/NavBar.module.scss";
import PropTypes from "prop-types";
import logo from "../assests/logoWhite.png";
import { Avatar } from "antd";
import { Badge } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function NavBar({ user, logout }) {
  const { Search } = Input;
  if (user.loading) return <div>Loading...</div>;
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
          <Link to="/dashboard">
            <Avatar src={user.avatar} />
          </Link>
        </li>
        <li>{user.name}</li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.avatar}>
          <Badge className={styles.badge} count={1}>
            <UserAddOutlined className={styles.icon} />
          </Badge>
        </li>
        <li onClick={logout} className={styles.logOut}>
          Log out
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(NavBar);
