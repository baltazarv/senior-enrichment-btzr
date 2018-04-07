import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Schools from './Schools';
import School from './School';
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
          <Route exact path="/" render={ ({ history }) => <Schools history={ history } /> } />
          <Route exact path="/school/:id/view" render={ ({ match, history }) => <School id={ match.params.id } history={ history } /> } />
          <Route path="/school/:id/edit" render={ ({ match, history }) => <School id={ match.params.id } history={ history } /> } />
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
