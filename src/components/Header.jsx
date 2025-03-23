import React from 'react'
import { clearIndexedDB } from './Editor';

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
    <>
      <header>
        <h1 id='title'>Doxle - Inspired by Google Docs</h1>
      </header>
      <div>
        <p style={styles.text}>
          Once you're done exploring, we can delete our data using this button: 
          <button style={styles.button} onClick={clearIndexedDB}> Delete </button>
        </p>
      </div>
    </>
  );
}

export default Header;
