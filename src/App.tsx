import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import EditorPage from "./pages/editor";

function App() {
  return (
    <Router>
      <Route path="/editor" component={EditorPage} />
    </Router>
  );
}

export default App;