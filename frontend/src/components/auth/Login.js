import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // In a real implementation, this would call the API to authenticate the user
    console.log('Login form submitted:', formData);
    // Simulate successful login
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Iniciar Sesión</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Accede a tu cuenta
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Iniciar Sesión" />
      </form>
      <p className="my-1">
        ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
      </p>
    </section>
  );
};

export default Login;
