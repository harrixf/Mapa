import React, { useEffect, useState } from 'react';
import Milestone from './Milestone.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Timeline.css';
import '../styles/NewSection.css';  // Agregar la nueva sección de estilos

gsap.registerPlugin(ScrollTrigger);

// Nueva sección que se superpone después del Timeline
const NewSection = () => {
  return (
    <div className="new-section">
      <h2>Nueva Sección Superpuesta</h2>
      <p>Esta sección aparece cuando se han completado todos los hitos.</p>
    </div>
  );
};

const Timeline = () => {
  const [milestones, setMilestones] = useState([]);

  // Fetch JSON data
  useEffect(() => {
    fetch('/milestones.json')
      .then((response) => response.json())
      .then((data) => {
        setMilestones(data.milestones);
      })
      .catch((err) => console.error('Error fetching milestones:', err));
  }, []);

  useEffect(() => {
    if (milestones.length > 0) {
      // Configurar la animación de los hitos
      milestones.forEach((milestone, index) => {
        ScrollTrigger.create({
          trigger: `.milestone-${index}`,  // Identificar cada hito por su índice
          start: "top bottom",
          end: "top center",
          onEnter: () => {
            gsap.to(`.milestone-${index}`, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(`.milestone-${index}`, {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.out"
            });
          },
        });
      });

      // Controlar el avance de la línea de tiempo
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          scrollTrigger: {
            trigger: `.milestone-${milestones.length - 1}`,  // Sincronizar con el último hito
            start: "top center",  // Cuando el último hito esté en el centro de la pantalla
            end: "bottom center", // Continúa hasta que el último hito esté completamente visible
            scrub: 1.5,  // Controlar la velocidad de la animación de la línea de tiempo
          },
        }
      );

      // Mostrar la nueva sección solo cuando el último hito esté completamente visible
      ScrollTrigger.create({
        trigger: `.milestone-${milestones.length - 1}`,  // El último hito
        start: "bottom center",  // Solo cuando el último hito esté completamente visible
        onEnter: () => {
          gsap.to(".new-section", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(".new-section", {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: "power2.in"
          });
        },
      });
    }
  }, [milestones]);

  return (
    <div>
      <div className="timeline-section">
        <div className="night-sky-background">
          <div className="timeline">
            <div className="timeline-line"></div>
            {milestones.length > 0 &&
              milestones.map((milestone, index) => (
                <Milestone
                  key={milestone.id || index}
                  date={milestone.date}
                  title={milestone.title}
                  description={milestone.description}
                  imageSrc={milestone.imageSrc}
                  altText={milestone.altText}
                  position={milestone.position}
                  additionalImageSrc={milestone.additionalImageSrc}
                  trailerUrl={milestone.trailerUrl}
                  className={`milestone milestone-${index}`}  // Añadir clase única para cada hito
                />
              ))}
          </div>
        </div>
      </div>
      {/* Nueva sección superpuesta */}
      <NewSection />
    </div>
  );
};

export default Timeline;
