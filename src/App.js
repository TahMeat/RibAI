import logo from './logo.svg';
import { useState } from 'react';

import './App.css';
import Input from './components/Input'

function App() {
  const [message, setMessage] = useState('');

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const sendMessage = async() => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Under construction with React, please hold.
        </p>
      </header>
      <Input
          type="text"
          autoComplete='off'
          value={message}
          name="text"
          placeholder="Enter your message"
          onChange={handleText}
      />
    </div>
  );
}
export default App;
