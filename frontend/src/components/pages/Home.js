import React, { useState } from 'react';

const Home = () => {
  const [featuredCourses] = useState([
    {
      id: '1',
      title: 'Dropshipping Profesional',
      description: 'Aprende a crear tu negocio de dropshipping desde cero y genera ingresos pasivos.',
      category: 'dropshipping',
      thumbnail: 'https://via.placeholder.com/300x200?text=Dropshipping',
      price: 99.99
    },
    {
      id: '2',
      title: 'Trading de Forex Avanzado',
      description: 'Domina las estrategias de trading en el mercado de divisas y maximiza tus ganancias.',
      category: 'forex',
      thumbnail: 'https://via.placeholder.com/300x200?text=Forex',
      price: 129.99
    },
    {
      id: '3',
      title: 'Inversión en Criptomonedas',
      description: 'Todo lo que necesitas saber para invertir de manera segura en el mundo de las criptomonedas.',
      category: 'crypto',
      thumbnail: 'https://via.placeholder.com/300x200?text=Crypto',
      price: 89.99
    }
  ]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Academia de Cursos Online</h1>
          <p className="lead">
            Aprende habilidades de alto valor en dropshipping, forex, criptomonedas, automatización con IA y creación de contenido.
          </p>
          <div className="cta-buttons">
            <a href="/courses" className="btn btn-primary">Ver Todos los Cursos</a>
            <a href="/subscription" className="btn btn-secondary">Suscripción Mensual $33</a>
          </div>
        </div>
      </section>

      <section className="featured-courses">
        <div className="container">
          <h2>Cursos Destacados</h2>
          <div className="course-grid">
            {featuredCourses.map(course => (
              <div key={course.id} className="course-card">
                <img src={course.thumbnail} alt={course.title} />
                <div className="card-body">
                  <span className="card-category">{course.category}</span>
                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-text">{course.description}</p>
                  <div className="card-footer">
                    <span className="card-price">${course.price}</span>
                    <a href={`/courses/${course.id}`} className="btn btn-sm btn-primary">Ver Detalles</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Categorías de Cursos</h2>
          <div className="category-grid">
            <a href="/courses/category/dropshipping" className="category-card">
              <h3>Dropshipping</h3>
              <p>Crea tu tienda online sin inventario</p>
            </a>
            <a href="/courses/category/forex" className="category-card">
              <h3>Forex</h3>
              <p>Aprende a operar en el mercado de divisas</p>
            </a>
            <a href="/courses/category/crypto" className="category-card">
              <h3>Criptomonedas</h3>
              <p>Invierte en el futuro de las finanzas digitales</p>
            </a>
            <a href="/courses/category/ai" className="category-card">
              <h3>Automatización con IA</h3>
              <p>Optimiza tus procesos con inteligencia artificial</p>
            </a>
            <a href="/courses/category/content" className="category-card">
              <h3>Creación de Contenido</h3>
              <p>Desarrolla habilidades para crear contenido de calidad</p>
            </a>
          </div>
        </div>
      </section>

      <section className="subscription-banner">
        <div className="container">
          <h2>Suscripción Premium</h2>
          <p>Accede a todos nuestros cursos por solo $33 al mes</p>
          <a href="/subscription" className="btn btn-lg btn-primary">Suscríbete Ahora</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
