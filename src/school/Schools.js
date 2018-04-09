import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSchool, deleteSchool } from '../store';

class Schools extends Component {
  constructor() {
    super();
    this.state = {
      newSchoolName: ''
    };
    this.onNewSchoolNameChange = this.onNewSchoolNameChange.bind(this);
    this.onCreateSchool = this.onCreateSchool.bind(this);
  }
  onNewSchoolNameChange(ev) {
    // console.log('onNewSchoolNameChange', ev.target.value);
    this.setState({ newSchoolName: ev.target.value });
  }
  onCreateSchool() {
    // console.log('createSchool', this.state.newSchoolName);
    this.props.createSchool({ name: this.state.newSchoolName });
  }
  render() {
    const { schools, studentCounts, deleteSchool } = this.props;
    const { onNewSchoolNameChange, onCreateSchool } = this;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto mr-auto"><div className="h1"><span className="oi oi-home" /> Schools</div></div>
          { !schools.length ? <div className="col-sm-12">There are no schools registered on the database.</div> : '' }
          <div className="col-auto"><a href="#" className="btn btn-outline-primary btn-sm h1-button mt-2" data-toggle="collapse" data-target="#addShchoolForm" aria-expanded="false" aria-controls="addShchoolForm">Add New School</a></div>
        </div>
        <div className="collapse" id="addShchoolForm">
          <div className="card card-body">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Enter School Name</span>
              </div>
              <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="School name" onChange={ onNewSchoolNameChange } />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="button" onClick={ onCreateSchool }>+ Create School +</button>
              </div>
            </div>
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
