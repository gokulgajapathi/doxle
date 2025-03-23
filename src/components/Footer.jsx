import React from 'react'
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    const styles = {
        footer: {
            marginTop: '2px',
            padding: '10px',
            backgroundColor: '#2c3e50',
            color: 'white',
            textAlign: 'center',
          },
          socialLinks: {
            height: '25px',
            width: '25px', 
            margin: '5px',
          },
          
    }
    return (
      <footer style={styles.footer}>
        <p>
          Made with ❤️ by <strong>Gokul Gajapathi</strong> <br />

          Connect with me at 

          <SocialIcon url="https://www.linkedin.com/in/gokul-gajapathi" style={styles.socialLinks} />
          
          <SocialIcon url="https://github.com/gokulgajapathi" style={styles.socialLinks} />
        </p>
        <p></p>

          
        
      </footer>
    );
  };

export default Footer