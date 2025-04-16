import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Academia de Cursos - Todos los derechos reservados</p>
        <div className="footer-links">
          <a href="#!">Términos y Condiciones</a> | 
          <a href="#!">Política de Privacidad</a> | 
          <a href="#!">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
