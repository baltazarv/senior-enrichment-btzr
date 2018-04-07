import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// schools
const SET_SCHOOLS = 'get schools';
const CREATE_SCHOOL = 'create school';
const UPDATE_SCHOOL = 'update school';
const DELETE_SCHOOL = 'delete school';
// students
const SET_STUDENTS = 'get students';
const UPDATE_STUDENT = 'update student';

const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCHOOLS:
      state = action.schools;
      break;
    case CREATE_SCHOOL:
      state = [...state, action.school];
      document.location.hash = `/school/${ action.school.id }/edit`;
      break;
    case UPDATE_SCHOOL:
      state = state.map(school => {
        return school.id === action.school.id ? action.school : school;
      });
      document.location.hash = `/school/${action.school.id}/view`;
      break;
    case DELETE_SCHOOL:
      state = state.filter(school => school.id !== action.id);
      document.location.hash = '/';
      break;
  default:
  }
  return state;
};

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      state = action.students;
      break;
    case UPDATE_STUDENT:
      state = state.map(student => {
        return student.id === action.student.id ? action.student : student;
      });
      break;
    default:
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

// Schools

const loadSchools = () => {
  return dispatch => {
    return axios.get('/api/schools')
    .then(results => results.data)
    .then(schools => dispatch({
      type: SET_SCHOOLS,
      schools
    }));
  };
};

const createSchool = school => {
  return dispatch => {
    return axios.post('/api/schools', school)
    .then(results => results.data)
    .then(school => dispatch({
      type: CREATE_SCHOOL,
      school
    }));
  };
};

const updateSchool = school => {
  return dispatch => {
    return axios.put(`/api/schools/${school.id}`, school)
      .then(results => results.data)
      .then(school => dispatch({
        type: UPDATE_SCHOOL,
        school
      }));
  };
};

const deleteSchool = id => {
  return dispatch => {
    return axios.delete(`/api/schools/${id}`)
    .then(() => dispatch({
      type: DELETE_SCHOOL,
      id
    }));
  };
};

// Students

const loadStudents = () => {
  return dispatch => {
    return axios.get('/api/students')
    .then(results => results.data)
    .then(students => dispatch({
      type: SET_STUDENTS,
      students
    }));
    // .then(storeObj => console.log(storeObj));
  };
};

const updateStudent = student => {
  return dispatch => {
    return axios.put(`/api/students/${student.id}`, student)
    .then(results => results.data)
    .then(student => {
      return dispatch({
        type: UPDATE_STUDENT,
        student
      });
    });
  };
};

export default store;
export { loadSchools, createSchool, updateSchool, loadStudents, updateStudent, deleteSchool };
