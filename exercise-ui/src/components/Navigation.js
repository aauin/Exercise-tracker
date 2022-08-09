import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  render() {    
    return (
      <nav className="Nav">
          <div className="Nav__right">
                <Link className="Nav__link" to="/">Home</Link> <Link className="Nav__link" to="/create-exercise">Add</Link>
          </div>
      </nav>
    );
  }
}