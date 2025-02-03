import React from 'react'
import Typed from 'typed.js'
import { Link as ScrollLink } from 'react-scroll';
import { auth, provider, signInWithPopup } from '../firebase/firebase'
import { AuthContext, AuthProvider } from '../Authentication/context'
import { useEffect, useState } from 'react'
import { useContext } from 'react'

const Dashboard = () => {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    new Typed("#element", {
      strings: ["Innovatex 2.0 ", " Innovatex 3.0"],
      typeSpeed: 150,
    });
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    const eventDate = new Date("April 15, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = eventDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

      setCountdown({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // const {user, signIn} = useContext(AuthContext)

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      signIn(user);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };
        
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glitch">
        <span className="bg-clip-text text-transparent text-center bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          <span id="element" className="justify-center self-center"></span>
        </span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-300">
        Unleash Innovation. Embrace the Future.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button className="gradient-border bg-black px-8 py-3 rounded-lg text-cyan-400 hover:text-white"> {/* onClick={handleGoogleSignIn} */}
          Register Now
        </button>
        <button className="px-8 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
          <ScrollLink to="events" smooth={true} duration={500}>Explore Events</ScrollLink>
        </button>
      </div>
      <div className="mt-12">
        <div className="text-2xl mb-4 text-cyan-400">Event Starts In</div>
        <div className="flex justify-center gap-4" id="countdown">
          <div className="bg-black/50 p-4 rounded-lg border border-cyan-500/30">
            <div className="text-3xl font-bold">{countdown.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg border border-cyan-500/30">
            <div className="text-3xl font-bold">{countdown.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg border border-cyan-500/30">
            <div className="text-3xl font-bold">{countdown.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg border border-cyan-500/30">
            <div className="text-3xl font-bold">{countdown.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard