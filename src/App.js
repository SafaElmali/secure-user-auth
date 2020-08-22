import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { AuthProvider } from './context/AutContext';


const AppRoutes = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Signup">Signup</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
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
