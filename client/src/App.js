import React from "react";
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

//components
import Home from "./pages/home.js";
import Landing from "./pages/landing.js";
import Cikis from "./components/Cikis";

export const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/logout" component={Cikis} />
      </Router>
    );
  }
}

export default App;
