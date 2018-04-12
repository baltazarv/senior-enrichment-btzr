import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent, updateSchool, deleteSchool } from '../store';
import StudentCreate from '../student/StudentCreate';

class School extends Component {
  constructor() {
    super();
    this.state = {
      isOnEditMode: false,
      imageURL: '',
      address1: '',
      address2: '',
      description: '',
      firstName: '',
      lastName: '',
      email: '',
      gpa: ''
    };
    this.removeStudent = this.removeStudent.bind(this);
    this.addExistingStudent = this.addExistingStudent.bind(this);
    this.applyEditMode = this.applyEditMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  componentWillMount() {
    this.applyEditMode();
    this.populateEditFields(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.applyEditMode();
    this.populateEditFields(nextProps);
  }
  applyEditMode() {
    this.setState({
      isOnEditMode: this.props.history.location.pathname.search('edit') !== -1
    });
  }
  populateEditFields(props) {
    this.setState({
      imageURL: props.school.imageurl,
      address1: props.school.address1,
      address2: props.school.address2,
      description: props.school.description,
    });
  }
  removeStudent(student) {
    const _student = Object.assign({}, student, { schoolId: -1 });
    this.props.updateStudent(_student);
  }
  addExistingStudent(student) {
    const _student = Object.assign({}, student, { schoolId: this.props.id * 1 });
    this.props.updateStudent(_student);
  }
  onChange(ev) {
    var change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  onUpdate(ev) {
    ev.preventDefault();
    const { imageURL, address1, address2, description } = this.state;
    const newValues = {
      imageURL,
      address1,
      address2,
      description
    };
    const updatedStudent = Object.assign({}, this.props.school, newValues);
    this.props.updateSchool(updatedStudent);
  }
  render() {
    const { school, studentsOfSchool, studentsNotInSchool, deleteSchool } = this.props;
    const { removeStudent, addExistingStudent, onChange, onUpdate } = this;
    const { isOnEditMode, imageURL, address1, address2, description } = this.state;
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-header h2">{ school.name }</div>
          <div className="card-body">
            <form onSubmit={ onUpdate }>
              <div className="row">
                <div className="col-md-6 pb-0 mr">
                  { isOnEditMode ?
                    <div><small><label className="" htmlFor="image-url">Image URL</label></small><textarea id="image-url" className="form-control" rows="2" placeholder="Image URL" value={ imageURL } name="imageURL" onChange={ onChange } /></div> :
                    <img className="img-thumbnail" src={ school.imageurl } alt={ school.name } />}
                    <div className="mt-3 mb-0 pl-2">
                    { isOnEditMode ?
                      <div><small><label htmlFor="addr1">Address 1</label></small><input id="addr1" className="form-control form-control-sm" type="text" placeholder="Address 1" value={ address1 } name="address1" onChange={ onChange } /></div> :
                      school.address1 }<br />
                    { isOnEditMode ?
                      <div><small><label htmlFor="addr2">Address 2</label></small><input id="addr2" className="form-control form-control-sm" type="text" placeholder="Address 2" value={ address2 } name="address2" onChange={ onChange } /></div> :
                      school.address2 }</div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col">{ isOnEditMode ? <div><small><label htmlFor="desc">Description</label></small><textarea id="desc" className="form-control" rows="7" placeholder="School Description" value={ description } name="description" onChange={ onChange } /></div> : <div className="long-description">{ school.description }</div> }</div>
                  </div>
                  {
                    isOnEditMode ?
                    <div className="row mt-3 mr-2 float-right">
                      <div className="col"><button className="btn btn-outline-warning btn-sm" type="submit">&lt; Update &gt;</button></div>
                    </div> :
                    ''
                  }
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="center-block">
              { isOnEditMode ? <Link className="btn btn-outline-info btn-sm" to={`/school/${school.id}/view`}>... View School ...</Link> : <Link className="btn btn-outline-info btn-sm" to={`/school/${school.id}/edit`}>... Edit School ...</Link> }&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={ () => deleteSchool(school.id)} >x Delete School x</button>
            </div>
          </div>
          <div className="card-header card-sub-header h4">
            <div className="row">
              <div className="col-auto mr-auto">{ studentsOfSchool.length ? '' : 'No ' }Students Enrolled</div>
              <div className="col-auto">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Add Existing Student
                  </button>
                  <div className="dropdown-menu">
                  {
                    studentsNotInSchool.map(student => {
                      return (
                        <button key={ student.id } className="dropdown-item" type="button" onClick={ () => addExistingStudent(student) }>{ student.name }</button>
                      );
                    })
                  }
                  </div>
                </div>
                &nbsp;
                <a href="#" className="btn btn-outline-primary btn-sm h1-button" data-toggle="collapse" data-target="#addStudentForm" aria-expanded="false" aria-controls="addStudentForm">Add New Student</a>
              </div>
            </div>
          </div>
          <div className={ 'table-responsive collapse ' + (!studentsOfSchool.length ? 'show' : '') } id="addStudentForm">
            <StudentCreate />
          </div>
          {
            !studentsOfSchool.length ? '' :
            <div className="table-responsive">
              <table className="table">
              <tbody>
              {
                studentsOfSchool.map(student => {
                  return (
                    <tr key={ student.id }>
                      <td className="align-middle"><Link to={`/student/${ student.id }/view`}><img className="img-rounded student-img" src={ student.imageurl } alt={ student.name } /></Link></td>
                      <td className="align-middle"><Link to={`/student/${ student.id }/view`}><strong>{ student.firstname } { student.lastname }</strong></Link></td>
                      <td className="align-middle"><a href={`mailto:${ student.email }`}>{ student.email }</a></td>
                      <td className="align-middle"><button className="btn btn-outline-danger btn-sm" onClick={ () => removeStudent(student) }>x Remove x</button></td>
                    </tr>
                  );
                })
              }
              </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ schools, students }, { id }) => {
  const school = schools.find(_school => _school.id == id) || {};
  const studentsOfSchool = students.filter(student => {
    return student.schoolId == id;
  });
  const studentsNotInSchool = students.filter(student => {
    return student.schoolId !== id * 1;
  });
  return {
    school,
    studentsOfSchool,
    studentsNotInSchool
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStudent: student => dispatch(updateStudent(student)),
    updateSchool: school => dispatch(updateSchool(school)),
    deleteSchool: id => dispatch(deleteSchool(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
