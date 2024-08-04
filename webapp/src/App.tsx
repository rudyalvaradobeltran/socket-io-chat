import { FormEvent, useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('broadcast', message => {
      console.log(`Message received from server: ${message}`);
    })
  }, []);
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Write your message'
          onChange={(e) => setMessage(e.target.value)}/>
        <button>
          Send
        </button>
      </form>
    </>
  )
}

export default App;
