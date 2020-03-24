import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import logo from './safefleet.png';

import 'bootstrap/dist/css/bootstrap.min.css'

import PartList from './components/list.component'
import Upload from './components/upload.component'

class App extends Component {
  render() {
    return (
      <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="https://www.safefleet.net/">
                <img src={logo} width="300" height="67" alt="https://www.safefleet.net/" />
              </a>
              <Link to="/" className="navbar-brand">Mobile Vision Repository</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Part List</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/upload" className="nav-link">Upload Part</Link>
                  </li>
                </ul>
              </div>
            </nav>
          <br/>
          <Route path="/" exact component={PartList}/>
          <Route path="/upload" exact component={Upload}/>
        </Router>
    );
  }
}

export default App;