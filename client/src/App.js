import React, { useEffect } from "react";
import Landing from "./pages/Landing";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import store from "./store";

import "./styles/App.scss";
import "antd/dist/antd.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Landing />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
