// import { Link } from 'react-router-dom'
// import  { useState } from 'react';
// function Signinandout() {
//     const [selectedButton, setSelectedButton] = useState('signin');

//   const handleButtonClick = (button) => {
//     setSelectedButton(button);
//   };
//   return (
//     <>
//     <Link to='#'>
//           <button className={selectedButton === 'signin' ? 'selected' : 'notselected'} onClick={() => handleButtonClick('signin')}>Signin</button>
//         </Link>
//         <Link to='#' >
//           <button className={selectedButton === 'signup' ? 'selected' : 'notselected'} onClick={() => handleButtonClick('signup')}>Signup</button>
//         </Link>
//     <div className='demo'></div>
//     </>
//   )
// }

// export default Signinandout


import { Link } from 'react-router-dom';
import { useState } from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import OppieIntro from './component/OppieIntro';

function Signinandout() {
  const [selectedButton, setSelectedButton] = useState('signin');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  // Render the component based on the selectedButton value
  const renderComponent = () => {
    if (selectedButton === 'signin') {
      return <Signin />;
    } else if (selectedButton === 'signup') {
      return <Signup />;
    }
  };

  return (
    <div className="parentSigninandout">
      <div className="oppie-text">
        <OppieIntro />
      </div>
      <div className="signinandoutbut" >
        <Link to='#'>
          <button className={selectedButton === 'signin' ? 'selected' : 'notselected'} onClick={() => handleButtonClick('signin')}>Signin</button>
        </Link>
        <Link to='#'>
          <button className={selectedButton === 'signup' ? 'selected' : 'notselected'} onClick={() => handleButtonClick('signup')}>Signup</button>
        </Link>
        <div className='demo'>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Signinandout;
