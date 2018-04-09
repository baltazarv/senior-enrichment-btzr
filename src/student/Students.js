import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStudent, deleteStudent } from '../store';
import StudentCreate from './StudentCreate';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: ''
    };
  }
  render() {
    const { students, studentSchoolMap, deleteStudent } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto mr-auto"><div className="h1"><span className="oi oi-people" /> Students</div></div>
          { !students.length ? <div className="col-sm-12">There are no students registered on the database.</div> : '' }
          <div className="col-auto"><a href="#" className="btn btn-outline-primary btn-sm h1-button mt-2" data-toggle="collapse" data-target="#addStudentForm" aria-expanded="false" aria-controls="addStudentForm">Add New Student</a></div>
        </div>
        <div className="collapse" id="addStudentForm">
          <div className="card card-body card-table">
              <StudentCreate />
          </div>
        </div>
        <div className="row">
        {
          !students.length ? '' : students.map(student => {
            return (
              <div key={ student.id } className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div className="card">
                  <Link className="card-header" to={`/student/${student.id}/view`}>{ student.firstname } { student.lastname }</Link>
                  <Link className="card-body student-card" to={`/student/${student.id}/view`}>
                    <img className="card-img student-img mx-auto d-block" src={ student.imageurl } alt={( student.firstname + ' ' + student.lastname )} />
                    <p className="card-text text-center">{ studentSchoolMap[student.id].school ? 'Member of ' : 'No school membership' } <strong>{ studentSchoolMap[student.id].school ? studentSchoolMap[student.id].school.name : '' }</strong></p>
                  </Link>
                  <div className="card-footer">
                    <Link className="btn btn-outline-info btn-sm" to={`/student/${ student.id }/edit`} role="button">... Edit ...</Link>&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={ () => deleteStudent(student.id) }>x Delete x</button>
                  </div>
                </div>
              </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students }) => {
  return {
    students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
    deleteStudent: id => dispatch(deleteStudent(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
