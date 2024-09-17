import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ParallaxSection.css';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  useEffect(() => {
    // Función para determinar si estamos en un dispositivo móvil
    const isMobile = window.innerWidth < 768;

    // Solo ejecutar la animación de parallax si no es un móvil
    if (!isMobile) {
      const parallaxAnimation = gsap.to('.parallax1', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax1',
          start: 'top top',
          end: 'bottom top',
          scrub: true, // Sincroniza la animación con el scroll
        },
      });

      // Cleanup de la animación para evitar fugas de memoria
      return () => {
        parallaxAnimation.kill();
      };
    }
  }, []); // Solo se ejecuta una vez al montarse

  return (
    <div className="parallax1">
      <picture>
        <source srcSet="/src/assets/images/zinemaldia_parallax.webp" type="image/webp" />
        <source srcSet="/src/assets/images/zinemaldia_parallax.png" type="image/png" />
        <img
          src="/src/assets/images/zinemaldia_parallax.png"
          alt="Imagen del Zinemaldia"
          loading="lazy"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </picture>
      <div className="content">
        <h1>El mapa estelar del Zinemaldia</h1>
        <p className="entradilla">
          Javier Badrem, Cate Blanchett, Isabelle Huppertt, Monica Bellucci... son muchas las estrellas que visitarán el 72º Zinemaldia. Para que ninguna sea fugaz, le presentamos un mapa para que no se pierda ninguna estrella.
        </p>
        <p className="firma">Narrativa digital y texto: Harri X. Fernández</p>
        <div className="scroll-down" aria-label="Desplazarse hacia abajo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
