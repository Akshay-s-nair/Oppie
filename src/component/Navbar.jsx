import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import photo from '../assets/oppie.png';
import signout from '../assets/signout.png';
function Navbar({ userName, onSignOut }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><img src={photo} alt="Oppie Logo" className="logo" /></Link>
        <span className="oppie-name">Oppie</span>
      </div>
      <div className="user-info">
        <span className="user-name">{userName}</span>
        <div className="signout">
        <img src={signout} alt="signout" className="logosignout" />
        <button className="signout-btn" onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
}

// PropTypes validation
Navbar.propTypes = {
  userName: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired
};

export default Navbar;
