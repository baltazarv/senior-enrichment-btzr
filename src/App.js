import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Schools from './Schools';
import { connect } from 'react-redux';
import { loadSchools, loadStudents } from './store';

class App extends Component {
  componentDidMount() {
    this.props.loadSchools();
    this.props.loadStudents();
  }
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={ Nav } />
          <Route path="/" component={ Schools } />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSchools: () => dispatch(loadSchools()),
    loadStudents: () => dispatch(loadStudents())
  };
};

export default connect(null, mapDispatchToProps)(App);
