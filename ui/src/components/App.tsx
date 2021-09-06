import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Race from "./race/Race";
import Login from "./login/Login";
import "../assets/styles/App.css";
import NotFound from "./NotFound";

const App = (): JSX.Element => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Redirect from="/" to="/login" />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/race" exact>
            <Race />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
