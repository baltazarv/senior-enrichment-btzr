constructor() {
  this.state = {
    error: null,
    errors: {

    }
  }
  this.validators = {
    name: (value) => {
      if(!value) {
        rturn 'name is required';
      }
    },
    rating: (value) => {

    }
}}

onChange(ev) {
  var change = {};
  change[ev.target.name] = ev.target.value;
  this.setState(change);
}

onSave(ev) {
  ev.preventDefault();
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
}
