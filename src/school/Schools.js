import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSchool, deleteSchool } from '../store';

class Schools extends Component {
  constructor() {
    super();
    this.state = {
      newSchoolName: '',
      errors: {}
    };
    this.onNewSchoolNameChange = this.onNewSchoolNameChange.bind(this);
    this.onCreateSchool = this.onCreateSchool.bind(this);
    this.validators = {
      newSchoolName: (value) => {
        if (!value) {
          return 'School name is required.';
        }
      }
    };
  }
  onNewSchoolNameChange(ev) {
    this.setState({ newSchoolName: ev.target.value });
  }
  onCreateSchool() {
    const error = this.validators.newSchoolName(this.state.newSchoolName);
    if (error) {
      this.setState({ errors: {
        newSchoolName: error
      }});
      return;
    }
    this.props.createSchool({ name: this.state.newSchoolName });
  }
  render() {
    const { schools, studentCounts, deleteSchool } = this.props;
    const { onNewSchoolNameChange, onCreateSchool } = this;
    const { errors } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto mr-auto"><div className="h1"><span className="oi oi-home" /> Schools</div></div>
          { !schools.length ? <div className="col-sm-12">There are no schools registered on the database.</div> : '' }
          <div className="col-auto"><a href="#" className="btn btn-outline-primary btn-sm h1-button mt-2" data-toggle="collapse" data-target="#addSchoolForm" aria-expanded="false" aria-controls="addSchoolForm">Add New School</a></div>
        </div>
        <div className="collapse" id="addSchoolForm">
          <div className="card card-body">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Enter School Name</span>
              </div>
              <input type="text" name="newSchoolName" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="School name" onChange={ onNewSchoolNameChange } />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" onClick={ onCreateSchool }>+ Create School +</button>
              </div>
            </div>
            <div className="text-danger">{ errors.newSchoolName }</div>
          </div>
        </div>
        <div className="row">
        {
          !schools.length ? '' : schools.map(school => {
            return (
              <div key={ school.id } className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div className="card">
                  <Link className="card-header" to={`/school/${school.id}/view`}>{ school.name }</Link>
                  <Link className="card-body" to={`/school/${school.id}/view`}>
                    <img className="card-img" src={ school.imageurl } alt={ school.name } />
                    <p className="card-text">{ studentCounts[school.id] ? studentCounts[school.id] : 0 } students enrolled</p>
                  </Link>
                  <div className="card-footer">
                      <Link className="btn btn-outline-info btn-sm" to={`/school/${ school.id }/edit`} role="button">... Edit ...</Link>&nbsp;&nbsp;&nbsp;
                      <button type="button" className="btn btn-outline-danger btn-sm" onClick={ () => deleteSchool(school.id) }>x Delete x</button>
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

const mapStateToProps = ({ schools, students }) => {
  const studentCounts = students.reduce((memo, student) => {
    const schoolId = student.schoolId;
    if (!memo[schoolId]) {
      memo[schoolId] = 0;
    }
    memo[schoolId]++;
    return memo;
  }, {});
  return {
    schools,
    studentCounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSchool: school => dispatch(createSchool(school)),
    deleteSchool: id => dispatch(deleteSchool(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
