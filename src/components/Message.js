import { useState } from 'react';
import './Message.css';

function Message() {
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to me.`);
    }, 5000);
  }

  return (
    <form className="Message" onSubmit={handleSubmit}>
      <input className="Text"
        placeholder="Enter a message here."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default Message;
