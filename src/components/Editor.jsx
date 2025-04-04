/*
 * Editor.js
 *
 * This component is the main text editing interface of the application.
 * It leverages Quill for rich text editing and Y.js for real-time collaboration.
 * It also includes offline support using IndexedDB and integrates with Firebase for user authentication(OAuth).
 */
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
import { useOutletContext } from "react-router-dom";


// Register the QuillCursors module to enable cursor awareness for collaborative editing.
Quill.register('modules/cursors', QuillCursors);

// Define color  and name(In case of user name not fetched) options for user cursors in the editor.
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
    border: 'none',
    padding: '10px',
    marginLeft: '5px',
    borderRadius: '15px 0px 0px 15px',
    cursor: 'pointer'
  },
  text: {
    textAlign: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  tagline: {
    textAlign: 'center',
     fontSize: '14px',
     fontStyle: 'italic',
     color: '#666',
     marginTop: '0px',
    },
    delete: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '0px 15px 15px 0px',
      padding: '10px',
      marginLeft: '1px',
      cursor: 'pointer'
    }    
};

/*
 * Editor Component
 *
 * - Sets up a Quill editor instance for rich text editing.
 * - Uses Y.js for collaborative editing, binding the Quill editor to a shared document( y.doc(text), quill-editor, cursor position, of all clients).
 * - Connects to a WebSocket provider for real-time collaboration.
 * - Implements offline persistence using IndexedDB.
 * - Integrates Firebase authentication to display the current user's name and handle sign-out.
 */
const Editor = () => {
  const navigate = useNavigate();

  // Ref to hold the DOM element that will contain the Quill editor.
  const editorContainerRef = useRef(null);

  // Ref to store the Quill editor instance.
  const quillRef = useRef(null);

  // Ref for the shared Y.js document that will be used for collaboration.
  const ydocRef = useRef(new Y.Doc());

  // Ref to store the WebSocket provider instance (for real-time sync).
  const providerRef = useRef(null);

  // Get the authenticated user from the outlet context.
  const { user } = useOutletContext();

  
  
  /*
   * handleLogout
   *
   * Logs the user out using Firebase signOut and navigates back to the login page.
   */
  const handleLogout = async () => {
        
    try {
        await signOut(auth);
        navigate("/");
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
  };

   /*
   * useEffect - Initialize Quill Editor and Collaboration
   *
   * This effect runs once when the component mounts. It:
   * - Checks if the editor container is ready and if the Quill instance is not yet created.
   * - Changes the default block element from <p> to <div> by re-registering Quill's block.
   * - Initializes a new Quill editor with the 'snow' theme and cursor support.
   * - Connects to a WebSocket provider for real-time collaboration using Y.js.
   * - Sets up offline persistence with IndexedDB.
   * - Binds the Quill editor to the Y.js document for collaborative editing.
   * - Sets up cursor awareness and logs awareness changes.
   */
  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {

       // Change default block element to <div> for Quill
      const Block = Quill.import('blots/block');
      Block.tagName = 'div'; 
      Quill.register(Block, true);

      // Initialize the Quill editor
      const quill = new Quill(editorContainerRef.current, {
        theme: 'snow',
        modules: {
          // Enable collaborative cursors
          cursors: true,
        },
      });
      quillRef.current = quill;

      // Connect WebSocketProvider (No Authentication)
      if (!providerRef.current) {
        providerRef.current = new WebsocketProvider(
          'wss://demos.yjs.dev/ws', // WebSocket endpoint for Y.js demo server
          'quill-demo-room',        // Room name for collaboration
          ydocRef.current           // Shared Y.js document
        );
      }

      // Offline Support using IndexedDB
      const persistence = new IndexeddbPersistence('quill-demo-room', ydocRef.current);

      // Ensure provider is connected
      providerRef.current.on('status', ({ status }) => {
        console.log(`WebSocket status: ${status}`);
      });

      // Bind Quill to Y.js document
      const awareness = providerRef.current.awareness;
      new QuillBinding(ydocRef.current.getText('quill'), quill, awareness);

      // Get the cursor module from Quill (for visualizing collaborator cursors)
      const cursors = quill.getModule('cursors');
      

      // Observe awareness changes
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
  }, []); // Runs once on mount

  /*
   * useEffect - Set Local User Awareness
   *
   * When the user information is available or updated, this effect:
   * - Retrieves the awareness module from the WebSocket provider.
   * - Sets the local state with the user's name and a random color.
   *   - If the user's display name is unavailable, assigns a random animal name.
   */
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
        <p style={styles.tagline}>( Name fetched from Google sign in(OAuth) )
        <button style={styles.signout} onClick={handleLogout}>Sign Out</button>
       
        <button style={styles.delete} onClick={()=> handleDelete(ydocRef)}> Delete </button>


          </p><br />
        
        
        <div ref={editorContainerRef} style={{ height: '505px' }} />
      </div>
)};

// Handle Delete
const handleDelete = (ydocRef) => {
  if (ydocRef.current) {
    const sharedText = ydocRef.current.getText('quill');
    sharedText.delete(0, sharedText.length);
    console.log('Editor text cleared!');
  }
};


export default Editor;