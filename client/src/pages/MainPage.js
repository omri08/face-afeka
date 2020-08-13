import React, { useEffect } from "react";
import PropTypes from "prop-types";
import setAuthToken from "../utils/setAuthToken";
import styles from "../styles/MainPage.module.scss";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

import { getWall } from "../actions/post";
import { connect } from "react-redux";

function MainPage({ getWall, loading, posts }) {
  useEffect(() => {
    getWall();
  }, []);

  const showPosts = (posts) => {
    console.log(posts);
    return posts.map((post) => (
      <Post
        key={post._id}
        name={post.name}
        text={post.text}
        avatar={post.avatar}
        time={post.date}
        id={post.user}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <CreatePost />
      <div className={styles.posts}>
        {loading ? "loading..." : showPosts(posts)}
      </div>
    </div>
  );
}
MainPage.propTypes = {
  getWall: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getWall })(MainPage);
