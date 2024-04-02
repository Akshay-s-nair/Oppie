import { useState } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './SignInUp.css';

const Signin = () =>{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const history = useHistory();
   
  const logInUser = () => {
    if(email.length === 0){
      alert("Email has left Blank!");
    } else if(password.length === 0){
      alert("password has left Blank!");
    } else {
      axios.post('http://127.0.0.1:5000/login', {
          email: email,
          password: password
      })
      .then(function (response) {
          console.log(response);
          const userData = response.data; // Assuming the response contains email, name, and id
          history.push("/Home", { userData }); // Pass user data to the next page
      })
      .catch(function (error) {
          console.log(error, 'error');
          if (error.response.status === 401) {
              alert("Invalid credentials");
          }
      });
    }
  }
 
  return(
    <>
      <div>
        <div className="formparent">
          <form className='formsignin' action="" style={{margin:"25px"}}>
            <div>
              <h1>Signin</h1>
            </div>
            <div>
              <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required="True"/>
            </div>
            <div>
              <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required="True"/>
            </div>
            <input className='submit' type="button" value={'Login'} onClick={logInUser}/>
            <div>
              Click <Link to="/Oppie/ForgotPassword"><span className='Here'>Here</span></Link> if you Forgot the Password
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signin;
