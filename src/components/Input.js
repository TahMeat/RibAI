import React, { useState } from 'react';
import './Input.css';

const Input = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [placeholderMessage, setPM] = useState('Enter your message');
  const [debounce, setDebounce] = useState(false);
  const [error, setError] = useState(false);
  const [eMessage, setEMessage] = useState('Waiting for bot\'s response...');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!debounce && inputValue.trim() !== ''){
      onSendMessage(inputValue, setDebounce, setError, setEMessage, setPM);
      setInputValue('');
      setError(false);
    }else{
      setError(true);
    }

  };

  return (
    <div className="input-wrapper">
      <form className="messageParent" onSubmit={handleSendMessage}>
      <input
        type="text"
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholderMessage}
        className={inputValue !== '' ? '' : 'grow'}
      />
      <button className={`send ${inputValue !== '' ? 'show' : ''}`} type="submit">➤</button>
      </form>
      <p className={`error ${error ? 'show' : ''}`}>{eMessage}</p>
    </div>
  );
};

export default Input;
