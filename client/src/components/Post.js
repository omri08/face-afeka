import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "../styles/Post.module.scss";

import { Avatar } from "antd";
import Moment from "react-moment";

const Post = ({ name, avatar, text, time, id }) => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <Avatar size={40} src={avatar} />
        <section>
          <span className={styles.name}>
            <Link to={`/profile/${id}`}>{name}</Link>
          </span>
          <span className={styles.time}>
            Posted on <Moment format="YYYY/MM/DD">{time}</Moment>
          </span>
        </section>
      </section>
      <section className={styles.text}>{text}</section>
    </div>
  );
};

Post.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Post;
