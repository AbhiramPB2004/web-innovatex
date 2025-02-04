import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { Points, PointMaterial } from "@react-three/drei";
// import "";

const About = () => {
  const slides = [
    {
      title: "About Presidency University",
      // image: "/images/presidency.jpg", // Update paths
      description:
        "Presidency University fosters innovation, research, and technology-driven education.",
    },
    {
      title: "About Build Club",
      // image: "/images/build-club.jpg",
      description:
        "A student-led tech community focused on AI, Robotics, and Software Development.",
    },
    {
      title: "About Innovatex",
      // image: "/images/innovatex.jpg",
      description:
        "The annual tech fest celebrating creativity, innovation, and futuristic technology.",
    },
  ];
  return (
    <div className="about-container">
      <h1 className="about-title">🚀 About Us</h1>
      <div className="carousel">
        {slides.map((slide, index) => (
          <motion.div
            className="card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            whileHover={{ scale: 1.05, rotateY: 15 }}
          >
            <img src={slide.image} alt={slide.title} className="card-image" />
            <h2 className="card-title">{slide.title}</h2>
            <p className="card-description">{slide.description}</p>
          </motion.div>
        ))}
      </div>
      <Canvas className="stars">
        <Stars />
      </Canvas>
    </div>
  )
}

function Stars() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.0005;
  });

  return (
    <Points ref={ref} limit={1000}>
      <PointMaterial color="white" size={0.02} />
    </Points>
  );
}

export default About