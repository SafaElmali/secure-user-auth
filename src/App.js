import React, { useContext, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider, AuthContext } from './context/AutContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';
import AppShell from './components/AppShell/AppShell';
import Settings from './pages/Settings/Settings';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory/Inventory'));
const Account = lazy(() => import('./pages/Account/Account'));
const Users = lazy(() => import('./pages/Users/Users'));

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

const AdminRoute = ({ children, ...props }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route {...props} render={() =>
      authContext.isAuthenticated() && authContext.isAdmin() ? (
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
    <Suspense fallback={<div>Loading..</div>}>
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
        <AdminRoute path="/inventory">
          <Inventory />
        </AdminRoute>
        <AuthenticatedRoute path="/account">
          <Account />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings">
          <Settings />
        </AuthenticatedRoute>
        <AdminRoute path="/users">
          <Users />
        </AdminRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
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
