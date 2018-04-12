import React from 'react';
import { Link } from 'react-router-dom';

const StudentView = ({ student, deleteStudent }) => {
  const { name, imageurl, email, gpa, id } = student;
  return (
    <div>
      <div className="card-header h2">{ name }</div>
      <div className="card-body">
        <div className="row">
        <div className="col-md-6 pb-0 mr">
          <img className="img-thumbnail" src={ imageurl } alt={ (  name ) } />
        </div>
        <div className="col-md-6">
          <p><em>Email:</em> <strong>{ email }</strong></p>
          <p><em>GPA:</em> <strong>{ gpa }</strong></p>
        </div>
      </div>
    </div>
    <div className="card-footer">
      <div className="center-block">
        <Link className="btn btn-outline-info btn-sm" to={`/student/${id}/edit`}>... Edit Student ...</Link>&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={ deleteStudent }>x Delete Student x</button>
      </div>
    </div>
  </div>
  );
};

export default StudentView;
