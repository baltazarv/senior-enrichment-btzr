import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StudentEdit extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      imageurl: '',
      email: '',
      gpa: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
  }
  componentDidMount() {
    this.populateEditFields(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.populateEditFields(nextProps);
  }
  populateEditFields(props) {
    if (props.student) {
      this.setState({
        firstname: props.student.firstname,
        lastname: props.student.lastname,
        imageurl: props.student.imageurl,
        email: props.student.email,
        gpa: props.student.gpa
      });
    }
  }
  onSubmitUpdate(ev) {
    ev.preventDefault();
    this.props.updateStudent(this.state);
  }
  onChange(ev) {
    var change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { firstname, lastname, imageurl, email, gpa } = this.state;
    const { student, deleteStudent } = this.props;
    const { onChange, onSubmitUpdate } = this;
    return (
      <div>
        <form onSubmit={ onSubmitUpdate }>
          <div className="card-header h2">
            <div className="row">
              <div className="col">
                <small><label htmlFor="firstname">First Name</label></small><input id="firstname" className="form-control form-control-sm" type="text" placeholder="First Name" value={ firstname || '' } name="firstname" onChange={ onChange } />
              </div>
              <div className="col">
                <small><label htmlFor="lastname">Last Name</label></small><input id="lastname" className="form-control form-control-sm" type="text" placeholder="Last Name" value={ lastname || '' } name="lastname" onChange={ onChange } />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 pb-0 mr">
                <small><label className="" htmlFor="imageurl">Image URL</label></small><textarea id="imageurl" className="form-control" rows="4" placeholder="Image URL" value={ imageurl || '' } name="imageurl" onChange={ onChange } />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                    <small><label htmlFor="email">Email</label></small><input id="email" className="form-control form-control-sm" type="text" placeholder="Email Address" value={ email || '' } name="email" onChange={ onChange } />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                  <small><label htmlFor="gpa">GPA</label></small><input id="gpa" className="form-control form-control-sm" type="text" placeholder="GPA" value={ gpa || '' } name="gpa" onChange={ onChange } />
                  </div>
                </div>
                <div className="row mt-3 mr-2 float-right">
                  <div className="col"><button className="btn btn-outline-warning btn-sm" type="submit">&lt; Update &gt;</button></div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="center-block">
              <Link className="btn btn-outline-info btn-sm" to={`/student/${student.id}/view`}>... View Student ...</Link>&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={ deleteStudent }>x Delete Student x</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default StudentEdit;
