import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb'
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);


const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
const animals = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Panda', 'Kangaroo', 'Dolphin', 'Penguin', 'Wolf'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length) + 1];
};

function getRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}

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
        '<-Your Websocket server->', 'quill-demo-room', ydocRef.current
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

  return <div ref={editorContainerRef} style={{ height: '505px' }} />;
};

// 🔹 Function to Clear IndexedDB
export const clearIndexedDB = async () => {
  const provider = new IndexeddbPersistence('quill-demo-room', new Y.Doc());
  await provider.clearData();
  console.log('IndexedDB data deleted for quill-demo-room');
};

export default Editor;