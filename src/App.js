import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from './context/AutContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';

const AppRoutes = () => {
  /* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
