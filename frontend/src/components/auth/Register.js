import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    fullName: ''
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const { username, email, password, password2, fullName } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      alert('Las contraseñas no coinciden');
    } else {
      // In a real implementation, this would call the API to register the user
      console.log('Registration form submitted:', formData);
      // Simulate successful registration
      setIsRegistered(true);
    }
  };

  if (isRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Registro</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Crea tu cuenta
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre de usuario"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre completo"
            name="fullName"
            value={fullName}
            onChange={onChange}
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrarse" />
      </form>
      <p className="my-1">
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
      </p>
    </section>
  );
};

export default Register;
