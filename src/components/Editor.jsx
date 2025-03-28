import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb'
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth'
import { useOutletContext } from "react-router-dom";



Quill.register('modules/cursors', QuillCursors);


const colors = ['#1E1E1E', '#007ACC', '#228B22', '#8B0000', '#483D8B'];
const animals = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Panda', 'Kangaroo', 'Dolphin', 'Penguin', 'Wolf'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

function getRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
};

const styles = {
  signout: {
    backgroundColor: 'rgb(79, 98, 223)',
    color: 'white',
    border: '1px solid white',
    padding: '10px',
    marginLeft: '5px',
    borderRadius: '0px 20px 20px 0px'
  },delete: {
    backgroundColor: 'red',
    color: 'white',
    border: '1px solid white',
    padding: '10px',
    marginLeft: '5px',
    borderRadius: '20px 0px 0px 20px'
  },
  text: {
    textAlign: 'center'
  },
  name: {
    textAlign: 'center',
    marginRight: '40px'
  },
  span: {
    textAlign: 'center',
     fontSize: '14px',
     fontStyle: 'italic',
     color: '#666',
     marginLeft: '4cm',
    }
};

const Editor = () => {
  const navigate = useNavigate();
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const ydocRef = useRef(new Y.Doc());
  const providerRef = useRef(null);
  const { user } = useOutletContext();

  
  

  const handleLogout = async () => {
        
    try {
        await signOut(auth);
        navigate("/");
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
  };

  
  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {
      const Block = Quill.import('blots/block');
      Block.tagName = 'div'; // Change default block element to <div>
      Quill.register(Block, true);
      const quill = new Quill(editorContainerRef.current, {
        theme: 'snow',
        modules: {
          cursors: true,
        },
      });
      quillRef.current = quill;

      // 🔹 Connect WebSocketProvider (No Authentication)
      if (!providerRef.current) {
        providerRef.current = new WebsocketProvider(
          'wss://demos.yjs.dev/ws', 
          'quill-demo-room', 
          ydocRef.current
        );
      }
      
      

      //Offline Support using IndexedDB
      const persistence = new IndexeddbPersistence('quill-demo-room', ydocRef.current);
      
      

      // Ensure provider is connected
      providerRef.current.on('status', ({ status }) => {
        console.log(`WebSocket status: ${status}`);
      });

      // 🔹 Bind Quill to Y.js document
      const awareness = providerRef.current.awareness;
      new QuillBinding(ydocRef.current.getText('quill'), quill, awareness);

      // 🔹 Cursor module setup
      const cursors = quill.getModule('cursors');
      

      // 🔹 Observe awareness changes
      awareness.on('change', () => {
        
        // Whenever somebody updates their awareness information,
        // we log all awareness information from all users.
        console.log(Array.from(awareness.getStates().values()))
      })

    }

    return () => {
      // Cleanup WebSocket connection when component unmounts
      if (providerRef.current) {
        providerRef.current.destroy();
      }
    };
  }, []);

  // 🔹 Set local user awareness
  useEffect(() => {
    if (user && providerRef.current) {
      const awareness = providerRef.current.awareness;
        awareness.setLocalStateField('user', {
          name: user.displayName || getRandomAnimal(), // Use display name if available
          color: getRandomColor(), 
        });

    }
  }, [user]); // Runs when user state updates

  return (
      <div><br />
        <h1 style={styles.name}>Welcome {user.displayName}!</h1>
        <p style={styles.span}>- Name fetched from Google sign in(Oauth) </p><br />
        <p style={styles.text}>
          Once you're done exploring, we can delete our data using this button: 
          <button style={styles.delete} onClick={clearIndexedDB}> Delete </button>
          <button style={styles.signout} onClick={handleLogout}>Sign Out</button>
        </p>
        
        <div ref={editorContainerRef} style={{ height: '505px' }} />
      </div>
)};

// 🔹 Function to Clear IndexedDB
export const clearIndexedDB = async () => {
  const provider = new IndexeddbPersistence('quill-demo-room', new Y.Doc());
  await provider.clearData();
  console.log('IndexedDB data deleted for quill-demo-room');
};

export default Editor;