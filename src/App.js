import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider, AuthContext } from './context/AutContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';
import Inventory from './pages/Inventory/Inventory';
import AppShell from './components/AppShell/AppShell';
import Account from './pages/Account/Account';

const AuthenticatedRoute = ({ children, ...props }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route {...props} render={() =>
      authContext.isAuthenticated() ? (
        <AppShell>
          {children}
        </AppShell>
      ) : (
          <Redirect to="/" />
        )
    } />
  )
}

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
      <AuthenticatedRoute path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/inventory">
        <Inventory />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/account">
        <Account />
      </AuthenticatedRoute>
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
