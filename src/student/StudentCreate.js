import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      error: null,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onCreateNew = this.onCreateNew.bind(this);
    this.validators = {
      firstname: (value) => {
        if (!value) {
          return 'First name is required.';
        }
      },
      lastname: (value) => {
        if (!value) {
          return 'Last name is required.';
        }
      },
      email: (value) => {
        if (!value) {
          return 'Email address is required.';
        }
      }
    };
  }
  onChange(ev) {
    var change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  onCreateNew() {
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if (Object.keys(errors).length) {
      console.log('errors', errors);
      return;
    }
    // const student = { firstname: this.props.id, lastname: this.state.lastname, email: this.state.email };
    this.props.createStudent(this.state)
    .catch(err => {
      this.setState({ error: err.response.data })
    });
  }
  render() {
    const { onChange, onCreateNew } = this;
    const { errors } = this.state;
    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="align-middle">
              * First Name <input className="form-control form-control-sm" type="text" placeholder="First Name" name="firstname" onChange={ onChange } />
              { errors.firstname }
            </td>
            <td className="align-middle">* Last Name <input className="form-control form-control-sm" type="text" placeholder="Last Name" name="lastname" onChange={ onChange } /></td>
            <td className="align-middle">* Emal Address <input className="form-control form-control-sm" type="email" placeholder="Email Address" name="email" onChange={ onChange } /></td>
            <td><button className="btn btn-outline-primary btn-sm float-right mt-3 mr-3" onClick={ onCreateNew }>+ Create New +</button></td>
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
