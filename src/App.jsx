import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "Creative Excellence",
    description: "Designed to make an impact",
    icon: "✦",
  },
  {
    number: "02",
    title: "Digital Experiences",
    description: "Ideas transformed into reality",
    icon: "▣",
  },
  {
    number: "03",
    title: "Driven by Innovation",
    description: "Built with purpose and passion",
    icon: "↗",
  },
];

function App() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const glowRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".navbar", {
          y: -40,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-eyebrow",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-title span",
          {
            y: 80,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".car-container",
          {
            x: -120,
            opacity: 0,
            scale: 0.85,
            duration: 1.3,
          },
          "-=0.5"
        )
        .from(
          ".stat-card",
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
          },
          "-=0.6"
        );

      // Scroll-controlled Lamborghini animation
      gsap.fromTo(
        carRef.current,
        {
          xPercent: -7,
          y: 0,
          rotation: 0,
          scale: 1,
        },
        {
          xPercent: 10,
          y: -35,
          rotation: -2,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      // Background glow movement
      gsap.fromTo(
        glowRef.current,
        {
          xPercent: -25,
        },
        {
          xPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Progress bar
      gsap.fromTo(
        progressRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Experience section reveal
      gsap.fromTo(
        ".reveal",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-section",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToExperience = () => {
    document
      .getElementById("experience")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app" ref={rootRef}>
      {/* Progress */}
      <div className="progress-track">
        <div
          ref={progressRef}
          className="progress-fill"
        />
      </div>

      {/* Navigation */}
      <header className="navbar">
        <a href="#home" className="logo">
          ITZ<span>FIZZ</span>.
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
        </nav>

        <button
          className="explore-button"
          onClick={scrollToExperience}
        >
          Explore <span>↗</span>
        </button>
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="hero-section"
          ref={heroRef}
        >
          <div className="hero-sticky">
            {/* Cinematic background */}
            <div className="background-grid" />
            <div className="tunnel-light tunnel-light-one" />
            <div className="tunnel-light tunnel-light-two" />

            <div
              ref={glowRef}
              className="ambient-glow"
            />

            <div className="hero-content">
              {/* Heading */}
              <div className="hero-heading">
                <p className="hero-eyebrow">
                  <span />
                  THE FUTURE IS IN MOTION
                </p>

                <h1 className="hero-title">
                  <span>WELCOME</span>
                  <span className="green-text">
                    ITZFIZZ
                  </span>
                </h1>

                <p className="hero-description">
                  Where creativity meets technology.
                  <br />
                  Every scroll tells a new story.
                </p>
              </div>

              {/* Lamborghini */}
              <div className="car-scene">
                <div className="car-floor-glow" />

                <div
                  className="car-container"
                  ref={carRef}
                >
                  <img
                    src="/itzfizz-hero.png"
                    alt="Lime-green Lamborghini-style supercar"
                    className="car-image"
                  />
                </div>

                <div className="floor-line" />
              </div>

              {/* Statistics */}
              <div className="statistics">
                {features.map((feature) => (
                  <article
                    className="stat-card"
                    key={feature.number}
                  >
                    <div className="stat-top">
                      <span className="stat-number">
                        {feature.number}
                      </span>

                      <span className="stat-icon">
                        {feature.icon}
                      </span>
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>

              <button
                className="scroll-indicator"
                onClick={scrollToExperience}
              >
                SCROLL TO EXPLORE
                <span>↓</span>
              </button>
            </div>

            <div className="side-label">
              DESIGNED TO MOVE
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          id="experience"
          className="experience-section"
        >
          <div className="experience-container">
            <p className="section-label reveal">
              <span />
              THE ITZFIZZ EXPERIENCE
            </p>

            <h2 className="experience-title reveal">
              THE FUTURE
              <br />
              <span>IS IN MOTION.</span>
            </h2>

            <p className="experience-description reveal">
              Where creativity meets technology.
              An immersive digital experience
              combining cinematic visuals,
              modern design, and scroll-driven
              animations.
            </p>

            <div className="feature-grid">
              <div className="feature-card reveal">
                <span>01 /</span>
                <h3>Scroll Driven</h3>
                <p>
                  The Lamborghini moves smoothly
                  according to your scroll position.
                </p>
              </div>

              <div className="feature-card reveal">
                <span>02 /</span>
                <h3>Premium Motion</h3>
                <p>
                  GSAP creates smooth and
                  natural transitions.
                </p>
              </div>

              <div className="feature-card reveal">
                <span>03 /</span>
                <h3>Responsive Design</h3>
                <p>
                  Optimized layouts for desktop,
                  tablet, and mobile.
                </p>
              </div>
            </div>

            <button
              className="back-button reveal"
              onClick={scrollToTop}
            >
              BACK TO TOP ↑
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-logo">
          ITZ<span>FIZZ</span>.
        </div>

        <p>
          SCROLL-DRIVEN FRONTEND EXPERIENCE
        </p>

        <p>
          BUILT WITH REACT + GSAP
        </p>
      </footer>
    </div>
  );
}

export default App;