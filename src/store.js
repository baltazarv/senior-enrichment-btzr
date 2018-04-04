import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_SCHOOLS = 'get schools';
const SET_STUDENTS = 'get students';

const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCHOOLS:
    state = action.schools;
    // console.log('schools', state);
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
    default:
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const loadSchools = () => {
  return dispatch => {
    return axios.get('/api/schools')
    .then(results => results.data)
    .then(schools => dispatch({
      type: SET_SCHOOLS,
      schools
    }));
    // .then(storeObj => console.log(storeObj));
  };
};

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

export default store;
export { loadSchools, loadStudents };
