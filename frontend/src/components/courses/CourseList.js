import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseList = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch courses from the API
    // For now, we'll use mock data
    const mockCourses = [
      {
        id: '1',
        title: 'Dropshipping Profesional',
        description: 'Aprende a crear tu negocio de dropshipping desde cero y genera ingresos pasivos.',
        category: 'dropshipping',
        thumbnail: 'https://via.placeholder.com/300x200?text=Dropshipping',
        price: 99.99,
        instructor: 'Juan Pérez',
        totalLessons: 24,
        totalDuration: 720 // minutes
      },
      {
        id: '2',
        title: 'Trading de Forex Avanzado',
        description: 'Domina las estrategias de trading en el mercado de divisas y maximiza tus ganancias.',
        category: 'forex',
        thumbnail: 'https://via.placeholder.com/300x200?text=Forex',
        price: 129.99,
        instructor: 'María Rodríguez',
        totalLessons: 32,
        totalDuration: 960 // minutes
      },
      {
        id: '3',
        title: 'Inversión en Criptomonedas',
        description: 'Todo lo que necesitas saber para invertir de manera segura en el mundo de las criptomonedas.',
        category: 'crypto',
        thumbnail: 'https://via.placeholder.com/300x200?text=Crypto',
        price: 89.99,
        instructor: 'Carlos Gómez',
        totalLessons: 18,
        totalDuration: 540 // minutes
      },
      {
        id: '4',
        title: 'Automatización con IA para Negocios',
        description: 'Implementa soluciones de inteligencia artificial para optimizar procesos en tu empresa.',
        category: 'ai',
        thumbnail: 'https://via.placeholder.com/300x200?text=AI',
        price: 149.99,
        instructor: 'Ana Martínez',
        totalLessons: 28,
        totalDuration: 840 // minutes
      },
      {
        id: '5',
        title: 'Creación de Contenido Digital',
        description: 'Aprende a crear contenido atractivo y efectivo para redes sociales y marketing digital.',
        category: 'content',
        thumbnail: 'https://via.placeholder.com/300x200?text=Content',
        price: 79.99,
        instructor: 'Pedro Sánchez',
        totalLessons: 22,
        totalDuration: 660 // minutes
      }
    ];

    setTimeout(() => {
      if (category) {
        setCourses(mockCourses.filter(course => course.category === category));
      } else {
        setCourses(mockCourses);
      }
      setLoading(false);
    }, 500); // Simulate API delay
  }, [category]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} horas`;
  };

  if (loading) {
    return <div className="container">Cargando cursos...</div>;
  }

  return (
    <div className="course-list-page">
      <div className="container">
        <h1>
          {category 
            ? `Cursos de ${category.charAt(0).toUpperCase() + category.slice(1)}` 
            : 'Todos los Cursos'}
        </h1>
        
        {courses.length === 0 ? (
          <p>No hay cursos disponibles en esta categoría.</p>
        ) : (
          <div className="course-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <img src={course.thumbnail} alt={course.title} />
                <div className="card-body">
                  <span className="card-category">{course.category}</span>
                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-text">{course.description}</p>
                  <div className="card-details">
                    <span><i className="fas fa-user"></i> {course.instructor}</span>
                    <span><i className="fas fa-book"></i> {course.totalLessons} lecciones</span>
                    <span><i className="fas fa-clock"></i> {formatDuration(course.totalDuration)}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-price">${course.price}</span>
                    <a href={`/courses/${course.id}`} className="btn btn-sm btn-primary">Ver Detalles</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
