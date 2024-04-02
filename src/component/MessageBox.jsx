import Navbar from './Navbar'; // Assuming this is the path to your Navbar component
import Chat from './Chat';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MessageBox() {
  const location = useLocation();
  const { userData } = location.state;
  const userName = userData.name; // Example user name, you can replace it with the actual user name
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      // Make a request to the backend to clear the session
      await axios.get("http://localhost:5000/logout");
      // Redirect to the home page
      history.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <Navbar userName={userName} onSignOut={handleSignOut} />
      <Chat />
    </div>
  );
}

export default MessageBox;
