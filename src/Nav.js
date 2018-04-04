import React from 'react';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Schools &amp; Students</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link active" href="#">Schools</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Students</a>
          </li>
        </ul>
      </div>
    </nav>  );
};

export default Nav;
