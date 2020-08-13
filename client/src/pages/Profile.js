import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "../styles/Profile.module.scss";
import api from "../utils/api";
import Post from "../components/Post";
import { Avatar } from "antd";

import { connect } from "react-redux";

function Profile({ params, profile }) {
  const [profileToShow, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(id) {
    const res = await api.get(`/profile/${id}`);
    const data = res.data;
    setProfile({ ...data });
  }

  async function fetchPosts(id) {
    const res = await api.get(`/posts/${id}`);
    setPosts(res.data);
  }

  useEffect(() => {
    if (params.id === profile.user._id) {
      setProfile(profile);
      fetchPosts(profile.user._id);
    } else {
      fetchProfile(params.id);
      fetchPosts(params.id);
    }
    setLoading(false);
  }, []);

  if (loading || profileToShow === null) return "loading...";

  return (
    <div className={styles.container}>
      <Avatar
        className={styles.avatar}
        size={100}
        src={profileToShow.user.avatar}
      />

      <section className={styles.bio}>
        <ul>
          {profileToShow.bio ? <li>{profileToShow.bio}</li> : ""}
          {profileToShow.company ? (
            <li>working at {profileToShow.company}</li>
          ) : (
            ""
          )}
          {profileToShow.location ? (
            <li>lives in {profileToShow.location}</li>
          ) : (
            ""
          )}
        </ul>
      </section>
      <section className={styles.posts}>
        <h1>Posts</h1>
        {posts.map(({ text, name, avatar, date, _id }) => (
          <Post
            key={_id}
            name={name}
            text={text}
            avatar={avatar}
            time={date}
            id={_id}
          />
        ))}
      </section>
    </div>
  );
}

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.profile.myProfile,
  params: ownProps.match.params,
});

export default connect(mapStateToProps)(Profile);
