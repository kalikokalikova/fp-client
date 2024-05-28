import React from 'react'
import daylightLanding from '../assets/daylightLanding.png';

const landingPageStyles = {
    container: {
      backgroundImage: `url(${daylightLanding})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center'
    },
    heading: {
      fontSize: '3em',
      margin: '0'
    }
  };

function LandingPage() {
  return (
    <div style={landingPageStyles.container}>
    <h1>LandingPage</h1>
    </div>

  )
}

export default LandingPage