import React, { useEffect, useState, useContext } from "react";
import Typed from "typed.js";
import { Link as ScrollLink } from "react-scroll";
import { auth, provider, signInWithPopup } from "../firebase/firebase";
import { AuthContext } from "../Authentication/context";
import "./style.css";

const Dashboard = () => {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    new Typed("#element", {
      strings: ["Innovatex"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: false,
    });
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    const eventDate = new Date("April 15, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = eventDate - now;

      if (distance < 0) return;

      const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

      setCountdown({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    
    <div id='dashboard' className="py-50 text-center ">
      <h1 className="text-4xl  md:text-6xl lg:text-7xl font-bold mb-6 glitch ">
        <span className="bg-clip-text text-transparent text-center text-white">
          <span id="element" className="justify-center self-center"></span>
        </span>
      </h1>
      <p className="relative z-10 mt-3 text-xl md:text-2xl text-gray-300">Unleash Innovation. Embrace the Future.</p>

      {/* CTA Button */}
      <div className="relative z-10 mt-6">
        <button className="px-8 py-3 text-lg font-semibold rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-lg">
          <ScrollLink to="events" smooth={true} duration={500}>
            Explore Events
          </ScrollLink>
        </button>
      </div>

      {/* Countdown Timer */}
      <div className="relative z-10 mt-12">
        <div className="text-2xl mb-4 text-cyan-400">Event Starts In</div>
        <div className="flex justify-center gap-6">
          {Object.entries(countdown).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-black/50 p-6 rounded-lg border border-cyan-500/30 text-center shadow-lg transform transition-transform hover:scale-110"
            >
              <div className="text-4xl font-extrabold text-white">{value}</div>
              <div className="text-sm uppercase tracking-wider text-cyan-300">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
