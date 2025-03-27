import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb'
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);


const colors = ['#1E1E1E', '#007ACC', '#228B22', '#8B0000', '#483D8B'];
const animals = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Panda', 'Kangaroo', 'Dolphin', 'Penguin', 'Wolf'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length) + 1];
};

function getRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
};

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

const Editor = () => {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const ydocRef = useRef(new Y.Doc());
  const providerRef = useRef(null);

  

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
      providerRef.current = new WebsocketProvider(
        'wss://demos.yjs.dev/ws', 'quill-demo-room', ydocRef.current
      );
      

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

      // 🔹 Set local user awareness
      awareness.setLocalStateField('user', {
        // Define a print name that should be displayed
        name: getRandomAnimal(),
        // Define a color that should be associated to the user:
        color: getRandomColor() // should be a hex color
      });

    }

    return () => {
      // Cleanup WebSocket connection when component unmounts
      if (providerRef.current) {
        providerRef.current.destroy();
      }
    };
  }, []);

  return (
      <div>
        <p style={styles.text}>
          Once you're done exploring, we can delete our data using this button: 
          <button style={styles.button} onClick={clearIndexedDB}> Delete </button>
        </p>
        
        <div ref={editorContainerRef} style={{ height: '505px' }} />;
      </div>
)};

// 🔹 Function to Clear IndexedDB
export const clearIndexedDB = async () => {
  const provider = new IndexeddbPersistence('quill-demo-room', new Y.Doc());
  await provider.clearData();
  console.log('IndexedDB data deleted for quill-demo-room');
};

export default Editor;