import React from 'react'

const Header = () => {
  const styles = {
    button: {
      backgroundColor: 'red',
      color: 'white',
      border: '1px solid white',
      padding: '10px',
      marginLeft: '5px',
      borderRadius: '15px 5px'
    },
    text: {
      textAlign: 'center'
    }
  };

  

  return (
      <header>
        <h1 id='title'>Doxle - Inspired by Google Docs</h1>
      </header>
  );
}

export default Header;