import  { useState } from 'react';
import { Link } from 'react-router-dom';
import OppieIntro from './OppieIntro';

function Home() {
  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div>
      <div className={`Home ${isRotated ? 'rotated' : ''}`}>
        <div className='oppie-text'>
          <OppieIntro />
        </div>
        <div className="formparent">
      <form className='formsignin' action="" style={{margin:"25px"}}>
        <div className='oppie-intro' onClick={handleImageClick}>
          <p className="pcaptionhome">Click <span style={{color:"green",fontWeight:"700"}}>me</span> to Start our Journey</p>
          <Link to="/Oppie">
            <span >
              <img src="src\assets\oppie.png" alt="Oppie" className={`rotatable ${isRotated ? 'rotate' : ''}`}/>
            </span>
          </Link>
        </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
