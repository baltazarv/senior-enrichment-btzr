import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import StudentView from './StudentView';
import StudentEdit from './StudentEdit';
import { updateStudent, deleteStudent } from '../store';

class Student extends Component {
  constructor() {
    super();
    this.state = {
      student: {}
    };
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addSchool = this.addSchool.bind(this);
  }
  deleteStudent() {
    this.props.deleteStudent(this.props.student.id);
  }
  updateStudent(stateProps) {
    const student = Object.assign({}, this.props.student, stateProps);
    document.location.hash = `/student/${ student.id }/view`;
    this.props.updateStudent(student);
  }
  addSchool(school) {
    const student = Object.assign({}, this.props.student, { schoolId: school.id })
    this.props.updateStudent(student);
  }
  render() {
    const { updateStudent, deleteStudent, addSchool } = this;
    const { student,  studentSchoolMap, schoolsNotMember } = this.props;
    return (
      <div className="container mt-4">
        <div className="card">
          <Router>
            <div>
              <Route path="/student/:id/view" render={({match, history}) => <StudentView id={ match.params.id } history={ history } student={ student } deleteStudent={ deleteStudent} /> } />
            <Route path="/student/:id/edit" render={({match, history}) => <StudentEdit id={ match.params.id } history={ history } student={ student } updateStudent={ updateStudent } deleteStudent={ deleteStudent} /> } />
            </div>
          </Router>
          <div className="card-header card-sub-header h5">
            <div className="row">
              <div className="col-sm-8">{ studentSchoolMap[student.id] && studentSchoolMap[student.id].school ? 'Member of ' + studentSchoolMap[student.id].school.name : 'No school membership.' }</div>
              <div className="col-sm-3">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { studentSchoolMap[student.id] && studentSchoolMap[student.id].school ? 'Change to School' : 'Add School' }
                  </button>
                  <div className="dropdown-menu">
                  {
                    schoolsNotMember.map(school => {
                      return (
                        <button key={ school.id } className="dropdown-item" type="button" onClick={ () => addSchool(school) }>{ school.name }</button>
                      );
                    })
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students, schools }, { id }) => {
  const student = students.find(_student => _student.id == id) || {};
  const schoolsNotMember = schools.filter(school => school.id != student.schoolId);
  return {
    student,
    schoolsNotMember
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStudent: student => dispatch(updateStudent(student)),
    deleteStudent: id => dispatch(deleteStudent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
