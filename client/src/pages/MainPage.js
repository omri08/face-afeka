import React from "react";
import styles from "../styles/MainPage.module.scss";
import CreatePost from "../components/CreatePost";
function MainPage() {
  return (
    <div className={styles.container}>
      <CreatePost />
    </div>
  );
}

export default MainPage;
