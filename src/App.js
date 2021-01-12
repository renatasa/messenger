import React, { Component } from "react";
import Messenger from "./containers/Messenger/Messenger";
import Login from "./containers/LoginForm/LoginForm";
import { Route, Switch } from "react-router-dom";
export class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/messenger">
          <Messenger />
        </Route>

        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    );
  }
}

export default App;
