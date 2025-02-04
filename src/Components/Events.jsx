import React from 'react'

const Events = () => {
  const { user,signIn, signOut } = useContext(AuthContext); //handleGoogleSignIn
  const [eventDetailsModal, setEventDetailsModal] = useState({
    isOpen: false,
    data: null,
  });
  const teamMembersSectionRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState(user.email);
  const [teamLeaderPhone, setTeamLeaderPhone] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [registerDetail, setRegisterDetail] = useState({ isOpen: false, data: null });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const postFormDetails = async (formDetails) => {
    try {
      const response = await axios.post("http://localhost:4000/register", formDetails, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        console.log("Server Response:", response.data);
        alert("Registration successful!");
        return true;
      } else {
        console.error("Error:", response.data);
        alert("Registration failed!");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred!");
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDetails = {
      teamLeaderName: e.target.teamLeaderName.value,
      teamLeaderEmail: e.target.teamLeaderEmail.value,
      teamLeaderPhone: e.target.teamLeaderPhone.value,
      teamSize: e.target.teamSize.value,
      teamMembers: [],
    };
  
    const teamMemberInputs = teamMembersSectionRef.current.querySelectorAll("input");
    teamMemberInputs.forEach((input) => {
      const memberDetails = {
        memberName: input.name === "memberName" ? input.value : null,
        memberPhone: input.name === "memberPhone" ? input.value : null,
      };
      formDetails.teamMembers.push(memberDetails);
    });
    console.log("Form Details:", formDetails);
  
    const isSuccess = await postFormDetails(formDetails);
    if (isSuccess) {
      e.target.reset();
    }
  };

  //google signIn
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
    <div>Events</div>
  )
}

export default Events