import React, {useRef} from "react";
import { useEffect, useState } from 'react';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const slides = [
    {
      title: "Build Club",
      description: "A community of makers, builders, and innovators working together to create amazing projects. We focus on hands-on learning and collaborative development.",
      features: [
        { icon: "🛠️", text: "Weekly Build Sessions" },
        { icon: "🧑‍🤝‍🧑", text: "Mentorship Programs" },
        { icon: "🚀", text: "Project Showcases" }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "Innovatex",
      description: "Leading the future of innovation through cutting-edge technology and creative solutions. We're reimagining what's possible.",
      features: [
        { icon: "💡", text: "Innovation Lab" },
        { icon: "💻", text: "Tech Incubator" },
        { icon: "📈", text: "Growth Programs" }
      ],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    },
    {
      title: "Presidency",
      description: "Leading with vision and purpose. Driving organizational success through strategic leadership and collaborative teamwork.",
      features: [
        { icon: "🚩", text: "Strategic Vision" },
        { icon: "🔗", text: "Organizational Leadership" },
        { icon: "🏆", text: "Achievement Milestones" }
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    }
  ];

  const getPrevIndex = () => (currentSlide - 1 + slides.length) % slides.length;
  const getNextIndex = () => (currentSlide + 1) % slides.length;

  const prevSlide = () => setCurrentSlide(getPrevIndex());
  const nextSlide = () => setCurrentSlide(getNextIndex());

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;

    if (Math.abs(swipeLength) > swipeThreshold) {
      if (swipeLength > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="cosmic-bg text-white min-h-screen">
      <style jsx>{`
        
        .slider-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateZ(-500px) rotateY(0deg);
          transition: all 0.8s ease-in-out;
        }
        .slide.active {
          opacity: 1;
          transform: translateZ(0) rotateY(0deg);
        }
        .slide.prev {
          transform: translateZ(-500px) rotateY(-60deg);
        }
        .slide.next {
          transform: translateZ(-500px) rotateY(60deg);
        }
        .nav-button { /* Style for the navigation buttons */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
          color: white;
          padding: 1rem 1.5rem; /* Increased padding */
          border: none;
          border-radius: 50%; /* Circular buttons */
          cursor: pointer;
          backdrop-filter: blur(5px); /* Added blur */
          transition: background-color 0.3s ease; /* Smooth transition */
        }

        .nav-button:hover {
          background-color: rgba(255, 255, 255, 0.4); /* Slightly more opaque on hover */
        }

        .nav-button i { /* Style for the icon inside the button */
          font-size: 1.5rem; /* Increased icon size */
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div
          className="slider-container relative h-[80vh] overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide bg-black/70 backdrop-blur-sm p-8 rounded-xl
                ${index === currentSlide ? 'active' : ''}
                ${index === getPrevIndex() ? 'prev' : ''}
                ${index === getNextIndex() ? 'next' : ''}`}
            >
              <div className="flex flex-col md:flex-row items-center h-full">
                <div className="md:w-1/2 p-6">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg mb-4">{slide.description}</p>
                  <div className="space-y-2">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <span className="mr-2">{feature.icon}</span> {/* Use the icon directly */}
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img src={slide.image} alt={slide.title} className="rounded-lg shadow-xl w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}

          <button onClick={prevSlide} className="nav-button left-4">
            <span className="mr-2">❮</span>
          </button>
          <button onClick={nextSlide} className="nav-button right-4">
            <span className="mr-2">❯</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;