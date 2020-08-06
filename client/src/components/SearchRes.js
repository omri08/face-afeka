import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import styles from "../styles/SearchRes.module.scss";
import { Button, Avatar, Divider } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";

import { connect } from "react-redux";

function SearchRes({ name, avatar, id, profile, myId, profileLoading }) {
  const [sentReq, setSentReq] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hisProfile, setHisProfile] = useState(null);
  const [approve, setApprove] = useState(false);

  useEffect(() => {
    async function loadHisProfile() {
      const res = await api.get(`/profile/user/${id}`);
      setHisProfile(res.data);
      setLoading(false);
    }
    loadHisProfile();
  }, []);

  async function approveFriendReq(id) {
    await api.put(`/friends/me/${id}`);
    setApprove(true);
  }

  async function sendFriendRequest(id) {
    await api.post(`/friends/${id}`);
    setSentReq(true);
  }

  function showButton(id, profile, myId) {
    // it's me
    if (id === myId) return "";
    // his my friend
    else if (approve || profile.friends.find((user) => user._id === id))
      return <Button type="primary">Already friends</Button>;
    // check if he sent me friend request
    else if (profile.friendRequests.find(({ user }) => user === id))
      return (
        <Button type="primary" onClick={() => approveFriendReq(id)}>
          Approve
        </Button>
      );
    // check if I've sent him already friend request
    else if (
      hisProfile.friendRequests.find(({ user }) => user === myId) ||
      sentReq
    )
      return (
        <Button type="primary" className={styles.sent} icon={<CheckOutlined />}>
          friend Request sent
        </Button>
      );
    else
      return (
        <Button
          onClick={() => sendFriendRequest(id)}
          type="primary"
          className={styles.add}
          icon={<PlusOutlined />}
        >
          Add friend
        </Button>
      );
  }

  if (loading || profileLoading) return "loading...";
  console.log(hisProfile, loading);
  return (
    <div className={styles.container}>
      <section className={styles.details}>
        <Avatar size={54} src={avatar} />
        <span className={styles.name}>{name}</span>
        {showButton(id, profile, myId)}
      </section>
      <Divider />
    </div>
  );
}

SearchRes.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  profileLoading: PropTypes.bool.isRequired,
  myId: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile.myProfile,
  profileLoading: state.profile.loading,
  myId: state.auth.user._id,
});

export default connect(mapStateToProps)(SearchRes);
