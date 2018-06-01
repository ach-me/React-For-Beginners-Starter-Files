import React from 'react';
import PropTypes from 'prop-types';

// en un componente stateless no hace falta usar "this.props.x" para acceder a las variables, sino "props.x"
const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory</p>
    <button className="github" onClick={() => props.authenticate('Github')}>
      Log in with Twitter
    </button>
    <button className="twitter" onClick={() => props.authenticate('Twitter')}>
      Log in with Facebook
    </button>
    <button className="facebook" onClick={() => props.authenticate('Facebook')}>
      Log in with Github
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
