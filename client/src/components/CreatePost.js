import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/CreatePost.module.scss";
import { Input } from "antd";
import { Avatar } from "antd";
import { Divider } from "antd";
import setAuthToken from "../utils/setAuthToken";
import { connect } from "react-redux";
import { addPost } from "../actions/post";
const { TextArea } = Input;

const CreatePost = ({ name, avatar, addPost }) => {
  const [formData, setFormData] = useState({
    text: "",
    private: false,
  });

  const onFinish = () => {
    addPost(formData);
  };

  const onChange = (e) => {
    const txt = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      text: txt,
    }));
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <span>Create Post</span>
      </section>
      <section className={styles.text}>
        <Avatar src={avatar} />
        <TextArea
          placeholder={`what's on your mind, ${name}?`}
          bordered={false}
          onPressEnter={onFinish}
          value={formData.text}
          onChange={(event) => onChange(event)}
        ></TextArea>
      </section>
      <Divider />
    </div>
  );
};

CreatePost.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.auth.user.name,
  avatar: state.auth.user.avatar,
});
export default connect(mapStateToProps, { addPost })(CreatePost);
