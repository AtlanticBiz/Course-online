import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Academia de Cursos</Link>
      </h1>
      <ul>
        <li>
          <Link to="/courses">Cursos</Link>
        </li>
        <li>
          <Link to="/courses/category/dropshipping">Dropshipping</Link>
        </li>
        <li>
          <Link to="/courses/category/forex">Forex</Link>
        </li>
        <li>
          <Link to="/courses/category/crypto">Crypto</Link>
        </li>
        <li>
          <Link to="/courses/category/ai">IA Automatización</Link>
        </li>
        <li>
          <Link to="/courses/category/content">Creación de Contenido</Link>
        </li>
        <li>
          <Link to="/dashboard">Mi Aprendizaje</Link>
        </li>
        <li>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
