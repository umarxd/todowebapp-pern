import react from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <Router className="App">
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/signup" component={RegisterScreen} />
      </Switch>
    </Router>
  );
}

export default App;
