import { FormEvent, useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('broadcast', receiveMessage);
    return () => {
      socket.off('broadcast', receiveMessage);
    }
  }, []);

  const receiveMessage = (message: string): any => {
    setMessages((state) => [...state, message]);
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Write your message'
          onChange={(e) => setMessage(e.target.value)}/>
        <button>
          Send
        </button>
      </form>
      <ul>
        {messages.map((message: any, index: number) => (
          <li key={index}>{message.from}:{message.body}</li>
        ))}
      </ul>
    </>
  )
}

export default App;
