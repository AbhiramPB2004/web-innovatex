import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Points, PointMaterial } from "@react-three/drei";

const About = () => {
  const slides = [
    {
      title: "About Presidency University",
      description:
        "Presidency University fosters innovation, research, and technology-driven education.",
    },
    {
      title: "About Build Club",
      description:
        "A student-led tech community focused on AI, Robotics, and Software Development.",
    },
    {
      title: "About Innovatex",
      description:
        "The annual tech fest celebrating creativity, innovation, and futuristic technology.",
    },
  ];

  return (
    <div id="about" className="about-container">
      <div className="carousel">
        {slides.map((slide, index) => (
          <motion.div
            className="card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.2 }}
            whileHover={{ scale: 2.05, rotateY: 20 }}
          >
            <h2 className="card-title">{slide.title}</h2>
            <p className="card-description">{slide.description}</p>
          </motion.div>
        ))}
      </div>
      <Canvas className="stars">
        <Stars />
      </Canvas>
    </div>
  );
};

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

export default About;