import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Milestone.css';

gsap.registerPlugin(ScrollTrigger);

const Milestone = ({ date, title, description, imageSrc, altText, position, trailerUrl, additionalImageSrc }) => {
  useEffect(() => {
    // Animar la aparición y desaparición de cada hito
    ScrollTrigger.create({
      trigger: `.milestone-${position}`,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(`.milestone-${position}`, { opacity: 1, y: 0, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(`.milestone-${position}`, { opacity: 1, y: 0, duration: 0.5 });
      },
    });

    // Animar el contenido adicional (tráiler o imagen)
    if (trailerUrl || additionalImageSrc) {
      ScrollTrigger.create({
        trigger: `.milestone-additional-content-${position}`,
        start: "top 80%",
        onEnter: () => {
          gsap.to(`.milestone-additional-content-${position}`, { opacity: 1, scale: 1, duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(`.milestone-additional-content-${position}`, { opacity: 1, scale: 1, duration: 0.8 });
        },
      });
    }
  }, [position, trailerUrl, additionalImageSrc]);

  return (
    <div className={`milestone milestone-${position}`}>
      {/* Contenedor de imagen principal */}
      <div className="milestone-image">
        <img src={imageSrc} alt={altText} loading="lazy" />
      </div>

      {/* Contenedor del contenido de texto */}
      <div className="milestone-content">
        <span className="milestone-date">{date}</span>
        <h2>{title}</h2>

        {/* Renderizar descripción con HTML para manejar enlaces y estilos */}
        <p dangerouslySetInnerHTML={{ __html: description }}></p>

        {/* Condicional: Mostrar el tráiler de YouTube si existe */}
        {trailerUrl && (
          <div className={`milestone-trailer milestone-additional-content-${position}`}>
            <iframe
              width="100%"
              height="315"
              src={trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Condicional: Mostrar la imagen adicional si existe */}
        {additionalImageSrc && (
          <div className={`milestone-additional-content milestone-additional-content-${position}`}>
            <img src={additionalImageSrc} alt="Additional content" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Milestone;
