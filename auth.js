function authenticate (login, password) {
  if (login === 'login' && password === 'password') {
    return 'You are were logged in';
  } else {
    return 'Login is incorrect';
  }
}
