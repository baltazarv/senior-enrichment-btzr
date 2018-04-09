import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Schools from './Schools';
import School from './School';
import Students from './Students';
import Student from './Student';
import { connect } from 'react-redux';
import { loadSchools, loadStudents } from './store';

class App extends Component {
  componentDidMount() {
    this.props.loadSchools();
    this.props.loadStudents();
  }
  render() {
    const { studentSchoolMap } = this.props;
    return (
      <Router>
        <div>
          <Route path="/"  render={ ({ history }) => <Nav history={ history } /> } />
          <Route exact path="/" render={ ({ history }) => <Schools history={ history } /> } />
          <Route exact path="/school/:id/view" render={ ({ match, history }) => <School id={ match.params.id } history={ history } /> } />
          <Route path="/school/:id/edit" render={ ({ match, history }) => <School id={ match.params.id } history={ history } /> } />
          <Route exact path="/students" render={ ({ history }) => <Students history={ history } studentSchoolMap={ studentSchoolMap } /> } />
          <Route path="/student/:id" render={({match, history}) => <Student id={ match.params.id } history={ history } studentSchoolMap={ studentSchoolMap } /> } />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ students, schools }) => {
  const studentSchoolMap = students.reduce((memo, student) => {
    const school = schools.find(_school => _school.id == student.schoolId) || null;
    memo[student.id] = memo[student.id] || {};
    memo[student.id].student = student;
    memo[student.id].school = school;
    return memo;
  }, {});
  return {
    studentSchoolMap
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSchools: () => dispatch(loadSchools()),
    loadStudents: () => dispatch(loadStudents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
