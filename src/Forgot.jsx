import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OppieIntro from "./component/OppieIntro";
// import './SignInUp.css';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email and name, Step 2: Enter new password

  const history = useHistory();

  const handleSubmitEmailAndName = (e) => {
    e.preventDefault();
    // Validate email and name if needed
    axios.post('http://127.0.0.1:5000/validate_email_and_name', {
      email: email,
      name: name
    })
    .then(function (response) {
      if (response.data.valid) {
        window.alert("Authentication Success")
        setStep(2); // Move to step 2 if email and name are valid
      } else {
        alert("Invalid email or name");
      }
    })
    .catch(function (error) {
      console.log(error);
      window.alert("Invalid email or name")
    });
  }

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios.post('http://127.0.0.1:5000/update_password', {
      email: email,
      newPassword: newPassword
    })
    .then(function (response) {
      alert("Password updated successfully");
      history.push("/Signin"); // Redirect back to signin after password update
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      {step === 1 && (
        <div className="formparent">
          <div className='oppie-text'>
          <OppieIntro />
        </div>
          <form className='formforgot' onSubmit={handleSubmitEmailAndName} style={{ margin: "25px" }}>
            <div>
              <h1>Forgot Password</h1>
              <h3>Enter your Email and Name</h3>
            </div>
            <div>
              <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <input className='submit' type="submit" value={'Submit'} />
          </form>
        </div>
      )}
      {step === 2 && (
        <div className="formparent">
          <div className='oppie-text'>
          <OppieIntro />
        </div>
          <form className='formforgot' onSubmit={handleSubmitNewPassword} style={{ margin: "25px" }}>
            <div>
              <h1>Forgot Password</h1>
              <h3>Enter your New Password</h3>
            </div>
            <div>
              <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div>
              <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <input className='submit' type="submit" value={'Submit'} />
          </form>
        </div>
      )}
      
    </div>
    
  )
}

export default Forgot;
