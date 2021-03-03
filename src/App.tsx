import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from './pages/Home'
import ProductPage from './pages/routes/product'
import BlogPage from './pages/routes/blog'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={HomePage}
          />
          <Route
            path="/blog"
            component={BlogPage}
          />
          <Route
            exact
            path="/product"
            component={ProductPage}
          />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
