import React from 'react'
import { useState, useRef, useContext } from 'react'; 
import { AuthContext, AuthProvider } from '../Authentication/context';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { auth, provider,db } from '../firebase/firebase';
import { eventDetails } from './EventDetails';
import axios from 'axios';
import { collection, addDoc } from "firebase/firestore";


const Events = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const[totalAmount, setTotalAmount] = useState(0);


  //get the authentication from context.jsx
  const { user,signIn, signOut } = useContext(AuthContext); //handleGoogleSignIn
  const [eventDetailsModal, setEventDetailsModal] = useState({
    isOpen: false,
    data: null,
  });

  const [paymentModal,SetPaymentModal] = useState(false);

  const teamMembersSectionRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPhone, setTeamLeaderPhone] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState([]);
  const [registerDetail, setRegisterDetail] = useState({ isOpen: false, data: null });



  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider).catch(console.log("something went wrong"));
      const user = result.user;
      console.log("User Info:", user);
      signIn(user);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };


  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log("Team Name:", teamName);
    console.log("Team Leader Name:", teamLeaderName);
    console.log("Team Leader Email:", teamLeaderEmail);
    console.log("Team Leader Phone:", teamLeaderPhone);
    console.log("Team Size:", teamSize);
    console.log("Team Members:", teamMembers);
    console.log("Selected Event:", selectedEvent);
    console.log("Total Amount:", selectedEvent.fee*teamSize);
    setTotalAmount(selectedEvent.fee*teamSize);
    const docRef = await addDoc(collection(db, "USER-Details"), {
      EventName: selectedEvent,
      TeamLeaderEmail: teamLeaderName,
      LeaderEmail: user.email,
      TeamLeaderPhone: teamLeaderPhone,
      TeamMembers: teamMembers,
      TeamName: teamName,
    });
    console.log("Document written with ID: ", docRef.id);
  };
 
  const handleRegistrationModalOn = async (eventDetails) => {
    if(user){
      console.log("User Info:", user);
      console.log("Event Details:", eventDetails);
      setSelectedEvent(eventDetails);
      setRegisterDetail({ isOpen: true, data: eventDetails });

    }else{  

      console.log("User not logged in");
      await handleGoogleSignIn();
      setSelectedEvent(eventDetails);
      setRegisterDetail({ isOpen: true, data: eventDetails });
    }
  };

  const handleRegistrationModalOff = () => {
    setRegisterDetail({ isOpen: false, data: null });
  };

  
  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setTeamSize(size);
    setTeamMembers(Array(size).fill({ memberName: '', memberPhone: '' }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  // Event Details Modal
  const openEventDetailsModal = (eventKey) => {
    console.log("Event Key:", eventDetails[eventKey]);
    setEventDetailsModal({ isOpen: true, data: eventDetails[eventKey] });
  };

  const closeEventDetailsModal = () => {
    setEventDetailsModal({ isOpen: false, data: null });
  };

  

  
  
  return (
    <div id='events' className="container mx-auto px-4 my-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400">
        Featured Events
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(eventDetails).map((key) => (
          <div
            key={key}
            className="gradient-border bg-black p-6 rounded-xl"
          >
            <div className="text-cyan-400 text-xl mb-4">
            <img src={eventDetails[key].image} alt={eventDetails[key].title} className="w-full h-auto rounded" />
            </div>
            <div className="text-cyan-400 text-xl mb-4">
              {eventDetails[key].title}
            </div>
            <p className="text-gray-300 mb-4">
              {eventDetails[key].tagline}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-fuchsia-400">
                Prize: {eventDetails[key].fee}
              </span>
              <button
                onClick={() => openEventDetailsModal(key)}
                className="px-2 py-3 bg-cyan-400 text-black rounded hover:bg-cyan-300"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
      {eventDetailsModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-black text-white p-6 rounded-lg gradient-border relative max-h-[90vh] w-full md:w-[60%] lg:w-[50%] overflow-y-auto custom-scrollbar">
            <button
              onClick={closeEventDetailsModal}
              className="absolute top-3 right-3 text-2xl text-cyan-400 hover:text-fuchsia-400"
            >
              &times;
            </button>
            <div className="mb-4">
              <img src={eventDetailsModal.data.image} alt={eventDetailsModal.data.title} className="w-full h-auto rounded" />
            </div>
            <h2 className="text-center text-2xl font-bold text-cyan-400 mb-2">
              {eventDetailsModal.data.title}
            </h2>
            <h3 className="text-center text-xl text-cyan-300 mb-4">
              {eventDetailsModal.data.tagline}
            </h3>
            <p className="text-gray-300 mb-4">{eventDetailsModal.data.description}</p>
            <ul className="space-y-2">
              <li>
                <strong>Entry Fee:</strong> {eventDetailsModal.data.fee}
              </li>
              <li>
                <strong>Price Pool:</strong> {eventDetailsModal.data.price_pool}
              </li>
              <li>
                <strong>Event Head:</strong> {eventDetailsModal.data.event_head}
              </li>
              <li>
                <strong>Event Head Number:</strong> {eventDetailsModal.data.event_head_number}
              </li>
              <li>
                <strong>Date:</strong> {eventDetailsModal.data.date}
              </li>
              <li>
                <strong>Time:</strong> {eventDetailsModal.data.time}
              </li>
              <li>
                <strong>Venue:</strong> {eventDetailsModal.data.venue}
              </li>
            </ul>
            <div className="flex space-x-2">
              <button
                onClick={() => window.open('/src/assets/brochure.pdf', '_blank')}
                className="px-2 py-3 bg-cyan-400 text-black rounded hover:bg-cyan-300"
              >
                View Details
              </button>
              <button
                onClick={() => handleRegistrationModalOn(eventDetailsModal.data.title)}
                className="px-2 py-3 bg-green-400 text-black rounded hover:bg-green-300"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {registerDetail.isOpen && (
        <div id="registration-modal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div class="bg-black text-white p-6 rounded-lg max-w-lg w-full gradient-border relative">
            <button id="close-modal" onClick={handleRegistrationModalOff} class="absolute top-3 right-3 text-2xl text-cyan-400 hover:text-fuchsia-400 transition-colors">&times;</button>
            <h2 class="text-center orbitron text-2xl font-bold text-cyan-400 mb-6">Register Now</h2>
            <form id="registration-form" class="space-y-4" onSubmit={HandleFormSubmit} >
              <div>
                <label className="block text-cyan-400 mb-2">Event Name</label>
                <input
                  type="text"
                  id="selected-event"
                  name="event"
                  readOnly
                  value={selectedEvent}
                  className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">Team Name *</label>
                <input
                  type="text"
                  id="team-name"
                  name="teamName"
                  placeholder="Enter team name"
                  className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">Team Leader Name *</label>
                <input
                  type="text"
                  id="team-leader-name"
                  name="teamLeaderName"
                  placeholder="Enter team leader name"
                  className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                  required
                  value={teamLeaderName}
                  onChange={(e) => setTeamLeaderName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">Team Leader Email *</label>
                <input
                  type="email"
                  id="team-leader-email"
                  name="teamLeaderEmail"
                  readOnly
                  value={user.email}
                  // placeholder="Enter your email"
                  className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                  // required
                />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">Team Leader Phone *</label>
                <input
                  type="text"
                  id="team-leader-phone"
                  name="teamLeaderPhone"
                  placeholder="Enter team leader phone"
                  className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                  required
                  value={teamLeaderPhone}
                  onChange={(e) => setTeamLeaderPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">Select Number of Team Members *</label>
                <div class="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="teamSize"
                      value="2"
                      className="mr-2"
                      required
                      checked={teamSize === 2}
                      onChange={handleTeamSizeChange}
                    /> 2
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="teamSize"
                      value="3"
                      className="mr-2"
                      required
                      checked={teamSize === 3}
                      onChange={handleTeamSizeChange}
                    /> 3
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="teamSize"
                      value="4"
                      className="mr-2"
                      required
                      checked={teamSize === 4}
                      onChange={handleTeamSizeChange}
                    /> 4
                  </label>
                </div>
              </div>
              <div id="team-members-section" ref={teamMembersSectionRef} className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex space-x-4">
                    <input
                      type="text"
                      name="memberName"
                      placeholder={`Member ${index + 1} Name`}
                      className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                      
                      onChange={(e) => handleTeamMemberChange(index, 'memberName', e.target.value)}
                    />
                    <input
                      name="memberPhone"
                      placeholder={`Member ${index + 1} Phone`}
                      className="w-full p-2 bg-gray-900 border border-cyan-500/30 rounded text-white"
                      onChange={(e) => handleTeamMemberChange(index, 'memberPhone', e.target.value)}
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <p class="text-cyan-400">Total Amount: <span id="total-amount" class="text-white">₹{registerDetail.data.fee*teamSize}</span></p>
              </div>
              <button type="submit"  className="px-8 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                  Pay
                </button>
            </form>
          </div>
        </div>
      )}  

      {paymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-black text-white p-6 rounded-lg gradient-border relative max-h-[90vh] w-full md:w-[60%] lg:w-[50%] overflow-y-auto custom-scrollbar">
            <button
              onClick={closeEventDetailsModal}
              className="absolute top-3 right-3 text-2xl text-cyan-400 hover:text-fuchsia-400"
            >
              &times;
            </button>
            <h2 className="text-center text-2xl font-bold text-cyan-400 mb-6">
              something
            </h2>
            <p className="text-gray-300 mb-4">{eventDetailsModal.data.description}</p>
            <ul className="space-y-2">
              <li>
                <strong>Entry Fee:</strong> {eventDetailsModal.data.fee}
              </li>
              <li>
                <strong>Date:</strong> {eventDetailsModal.data.date}
              </li>
              <li>
                <strong>Time:</strong> {eventDetailsModal.data.time}
              </li>
              <li>
                <strong>Venue:</strong> {eventDetailsModal.data.venue}
              </li> 
            </ul>
          </div>
        </div>
      )} 
    </div>
  )
}

export default Events