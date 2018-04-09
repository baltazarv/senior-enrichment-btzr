import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    var change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { onChange, onCreateNew } = this;
    const student = this.state;
    const { createStudent } = this.props;
    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="align-middle">* First Name <input className="form-control form-control-sm" type="text" placeholder="First Name" name="firstname" onChange={ onChange } /></td>
            <td className="align-middle">* Last Name <input className="form-control form-control-sm" type="text" placeholder="Last Name" name="lastname" onChange={ onChange } /></td>
            <td className="align-middle">* Emal Address <input className="form-control form-control-sm" type="email" placeholder="Email Address" name="email" onChange={ onChange } /></td>
            <td><button className="btn btn-outline-primary btn-sm float-right mt-3 mr-3" onClick={ () => createStudent(student) }>+ Create New +</button></td>
            </tr>
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student))
  };
};

export default connect(null, mapDispatchToProps)(StudentCreate);
