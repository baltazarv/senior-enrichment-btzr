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
      return;
    }
    this.props.createStudent(this.state)
    .catch(err => {
      this.setState({ error: err.response.data })
    });
  }
  render() {
    const { onChange, onCreateNew } = this;
    const { errors } = this.state;
    return (
      <div className="row justify-content-between">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="studentfirstname">* First Name</label> <input className="form-control form-control-sm" id="studentfirstname" type="text" placeholder="First Name" name="firstname" onChange={ onChange } />
            <small className="text-danger">{ errors.firstname }</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>* Last Name</label> <input className="form-control form-control-sm" type="text" placeholder="Last Name" name="lastname" onChange={ onChange } />
            <small className="text-danger">{ errors.lastname }</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>* Emal Address</label> <input className="form-control form-control-sm" type="email" placeholder="Email Address" name="email" onChange={ onChange } />
            <small className="text-danger">{ errors.email }</small>
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-primary btn-sm  float-right mt-4 mr-2" onClick={ onCreateNew }>+ Create New +</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student))
  };
};

export default connect(null, mapDispatchToProps)(StudentCreate);
