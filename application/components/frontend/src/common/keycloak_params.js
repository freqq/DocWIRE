export default {
  url: `http://${window.location.host}/auth/`,
  realm: 'master',
  clientId: 'frontend',
  onLoad: 'login-required',
};
