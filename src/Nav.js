import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ history }) => {
  const pathname = history.location.pathname;
  const isSchoolSection = pathname.search('school') > 0 || pathname === '/';
  const isStudentSection = pathname.search('student') > 0;
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Schools &amp; Students</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className={ 'nav-link' + ( isSchoolSection ? ' active' : '' )} to="/"><span className="oi oi-home" /> Schools</Link>
          </li>
          <li className="nav-item">
            <Link className={ 'nav-link' + ( isStudentSection ? ' active' : '' )} to="/students"><span className="oi oi-people" /> Students</Link>
          </li>
        </ul>
      </div>
    </nav>);
};

export default Nav;
