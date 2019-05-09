import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <nav className="navbar solid light">
        {/*<div className="basic-wrapper">*/}
          {/*<div className="basic-wrapper">*/}
            {/*<div className="navbar-brand">*/}
              {/*<a href="index.html">*/}
                {/*<image></image>*/}
              {/*</a>*/}
              {/*<a className="btn responsive-menu" data-toggle="collapse" data-target=".navbar-collapse"><i></i></a>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <Link to="/">Home</Link>
            </li>
            <li className="dropdown">
              {/*<a href="#" className="dropdown-toggle">Portforlio</a>*/}
              <Link to="/portforlio" className="dropdown-toggle">Portforlio</Link>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle">Contact Us</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
