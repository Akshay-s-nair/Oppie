// import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import {  useHistory } from 'react-router-dom';
import './SignInUp.css';

function Signup() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const history = useHistory();
     
    const registerUser = () => {
        axios.post('http://127.0.0.1:5000/signup', {
            name : name ,
            email: email,
            password: password
        })
        .then(function (response) {
             console.log(response);
             history.push("/Home"); // Redirect to homepage
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    };
  
  return (
    <>
      <div>
        <div className="formparent">
        <form action="" className='formsignup' style={{margin:"25px"}}>
        <h1>Signup</h1>
          <div>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} required="True"/>
          </div>
          <div>
            <input type="email" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>  
           </div>
          <div>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required="True" />
          </div>
          <div>
            <input type="password" placeholder='Confirm Password' required="True"/>
          </div>
          
          <input className='submit' type="submit" value={'Submit'} onClick={() => registerUser()}/>
          {/* <div>
            Have an account? Click <Link to="/"><span className='Here'>Here</span></Link> to Login
          </div> */}
        </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
