import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb'
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);

const getRandomColor = () => {
  const colors = ['#000'];
  return colors[Math.floor(Math.random() * colors.length) + 1];
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
        '<--- websocket-server-url --->', 'quill-demo-room', ydocRef.current
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
      console.log('cursors :: ', cursors);
      

      // 🔹 Observe awareness changes
      awareness.on('change', () => {
        
        // Whenever somebody updates their awareness information,
        // we log all awareness information from all users.
        console.log(Array.from(awareness.getStates().values()))
      })

      // 🔹 Set local user awareness
      awareness.setLocalState({
          name: `joker-${Math.floor(Math.random() * 100) + 1}`,
          color: getRandomColor()
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