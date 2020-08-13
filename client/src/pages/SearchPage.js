import React, { useState, useEffect, useMemo } from "react";
import api from "../utils/api";
import SearchRes from "../components/SearchRes";
import PropTypes from "prop-types";

import styles from "../styles/SearchPage.module.scss";

function SearchPage({ match: { params } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const searchValue = useMemo(() => params.fields.toLowerCase(), [params]);

  async function fetchDataAndFilter() {
    const res = await api.get("/profile");
    setData(
      res.data.filter(({ user: { name } }) =>
        name.toLowerCase().startsWith(searchValue)
      )
    );
    console.log(res);
    setLoading(false);
  }

  useEffect(() => {
    fetchDataAndFilter();
  }, [searchValue]);
  if (loading) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Results</h1>
      {data.map(({ user }) => (
        <SearchRes
          key={user._id}
          name={user.name}
          avatar={user.avatar}
          id={user._id}
        />
      ))}
    </div>
  );
}

SearchPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default SearchPage;
