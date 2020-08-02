import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
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
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/wall" component={MainPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
