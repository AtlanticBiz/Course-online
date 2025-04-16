import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch course details from the API
    // For now, we'll use mock data
    const mockCourses = {
      '1': {
        id: '1',
        title: 'Dropshipping Profesional',
        description: 'Aprende a crear tu negocio de dropshipping desde cero y genera ingresos pasivos. Este curso completo te guiará paso a paso en la creación de tu tienda online sin necesidad de inventario.',
        longDescription: `
          <p>El dropshipping es un modelo de negocio que te permite vender productos sin tener que manejar inventario, envíos o logística. En este curso completo, aprenderás todo lo que necesitas para crear un negocio de dropshipping exitoso desde cero.</p>
          
          <p>A lo largo de este curso, cubriremos:</p>
          <ul>
            <li>Fundamentos del dropshipping y cómo funciona</li>
            <li>Investigación de mercado y selección de nichos rentables</li>
            <li>Cómo encontrar proveedores confiables</li>
            <li>Creación y configuración de tu tienda online</li>
            <li>Estrategias de marketing y publicidad</li>
            <li>Optimización de conversiones y ventas</li>
            <li>Gestión de pedidos y servicio al cliente</li>
            <li>Escalamiento del negocio</li>
          </ul>
          
          <p>Al finalizar este curso, tendrás todos los conocimientos y herramientas necesarios para lanzar y hacer crecer tu propio negocio de dropshipping.</p>
        `,
        category: 'dropshipping',
        thumbnail: 'https://via.placeholder.com/800x450?text=Dropshipping+Course',
        price: 99.99,
        instructor: 'Juan Pérez',
        totalLessons: 24,
        totalDuration: 720, // minutes
        modules: [
          {
            moduleId: 'm1',
            title: 'Introducción al Dropshipping',
            description: 'Fundamentos y conceptos básicos',
            lessons: [
              {
                lessonId: 'l1',
                title: '¿Qué es el Dropshipping?',
                description: 'Introducción al modelo de negocio',
                contentType: 'video',
                duration: 15
              },
              {
                lessonId: 'l2',
                title: 'Ventajas y Desventajas',
                description: 'Análisis de pros y contras',
                contentType: 'video',
                duration: 20
              }
            ]
          },
          {
            moduleId: 'm2',
            title: 'Investigación de Mercado',
            description: 'Cómo encontrar nichos rentables',
            lessons: [
              {
                lessonId: 'l3',
                title: 'Selección de Nicho',
                description: 'Estrategias para encontrar nichos rentables',
                contentType: 'video',
                duration: 25
              },
              {
                lessonId: 'l4',
                title: 'Análisis de Competencia',
                description: 'Cómo evaluar a tus competidores',
                contentType: 'video',
                duration: 30
              }
            ]
          }
        ]
      },
      '2': {
        id: '2',
        title: 'Trading de Forex Avanzado',
        description: 'Domina las estrategias de trading en el mercado de divisas y maximiza tus ganancias.',
        longDescription: `
          <p>El trading de Forex es una de las formas más populares de inversión en los mercados financieros. Este curso avanzado te enseñará estrategias probadas para operar en el mercado de divisas con confianza y precisión.</p>
          
          <p>En este curso completo, aprenderás:</p>
          <ul>
            <li>Análisis técnico avanzado para identificar tendencias</li>
            <li>Estrategias de gestión de riesgo profesionales</li>
            <li>Psicología del trading y control emocional</li>
            <li>Uso de indicadores avanzados y osciladores</li>
            <li>Trading algorítmico y automatizado</li>
            <li>Análisis fundamental y su impacto en el mercado</li>
          </ul>
          
          <p>Este curso está diseñado para traders con conocimientos básicos que desean llevar sus habilidades al siguiente nivel.</p>
        `,
        category: 'forex',
        thumbnail: 'https://via.placeholder.com/800x450?text=Forex+Trading',
        price: 129.99,
        instructor: 'María Rodríguez',
        totalLessons: 32,
        totalDuration: 960, // minutes
        modules: [
          {
            moduleId: 'm1',
            title: 'Fundamentos del Análisis Técnico',
            description: 'Herramientas avanzadas para el análisis de gráficos',
            lessons: [
              {
                lessonId: 'l1',
                title: 'Patrones de Velas Japonesas',
                description: 'Identificación y uso de patrones avanzados',
                contentType: 'video',
                duration: 35
              },
              {
                lessonId: 'l2',
                title: 'Ondas de Elliott',
                description: 'Teoría y aplicación práctica',
                contentType: 'video',
                duration: 40
              }
            ]
          }
        ]
      }
    };

    setTimeout(() => {
      if (mockCourses[id]) {
        setCourse(mockCourses[id]);
      }
      setLoading(false);
    }, 500); // Simulate API delay
  }, [id]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} horas`;
  };

  if (loading) {
    return <div className="container">Cargando detalles del curso...</div>;
  }

  if (!course) {
    return <div className="container">Curso no encontrado</div>;
  }

  return (
    <div className="course-detail-page">
      <div className="container">
        <div className="course-header">
          <div className="course-header-content">
            <span className="course-category">{course.category}</span>
            <h1>{course.title}</h1>
            <p className="course-description">{course.description}</p>
            <div className="course-meta">
              <span><i className="fas fa-user"></i> Instructor: {course.instructor}</span>
              <span><i className="fas fa-book"></i> {course.totalLessons} lecciones</span>
              <span><i className="fas fa-clock"></i> {formatDuration(course.totalDuration)}</span>
            </div>
          </div>
          <div className="course-header-image">
            <img src={course.thumbnail} alt={course.title} />
          </div>
        </div>

        <div className="course-actions">
          <div className="course-price">
            <span className="price-tag">${course.price}</span>
            <span className="price-info">Acceso de por vida</span>
          </div>
          <div className="course-buttons">
            <Link to={`/courses/${course.id}/enroll`} className="btn btn-primary btn-lg">Comprar Ahora</Link>
            <Link to="/subscription" className="btn btn-secondary btn-lg">O Suscríbete por $33/mes</Link>
          </div>
        </div>

        <div className="course-content">
          <div className="course-tabs">
            <div className="tab-content">
              <div className="tab-pane active">
                <h2>Acerca de este curso</h2>
                <div className="course-long-description" dangerouslySetInnerHTML={{ __html: course.longDescription }}></div>
                
                <h2>Contenido del curso</h2>
                <div className="course-curriculum">
                  {course.modules.map((module, index) => (
                    <div key={module.moduleId} className="curriculum-module">
                      <div className="module-header">
                        <h3>Módulo {index + 1}: {module.title}</h3>
                        <p>{module.description}</p>
                      </div>
                      <div className="module-lessons">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.lessonId} className="lesson-item">
                            <span className="lesson-number">{index + 1}.{lessonIndex + 1}</span>
                            <span className="lesson-title">{lesson.title}</span>
                            <span className="lesson-duration">{lesson.duration} min</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
