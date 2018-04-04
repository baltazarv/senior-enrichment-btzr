import React from 'react';
import { connect } from 'react-redux';

const Schools = ({ schools, studentCounts }) => {
  return (
    <div className="container-fluid">
      <h1 className="h1">Schools <a href="#" className="btn btn-outline-primary btn-sm">+ Add +</a></h1>
      <div className="row">
      {
        schools.map(school => {
          return (
              <div key={ school.id } className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div className="card">
                  <div className="card-header">{ school.name }</div>
                  <div className="card-body">
                    <img className="card-img" src={ school.imageurl } alt="Card image cap" />
                    <p className="card-text">{ studentCounts[school.id] ? studentCounts[school.id] : 0 } students enrolled</p>
                  </div>
                  <div className="card-footer">
                      <a href="#" className="btn btn-outline-info btn-sm">... Edit ...</a>&nbsp;&nbsp;&nbsp;
                      <a href="#" className="btn btn-outline-danger btn-sm">x Delete x</a>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      </div>
    );
};

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

export default connect(mapStateToProps)(Schools);
