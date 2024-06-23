import { useState } from 'react';

import './App.css';
import ChatBox from './components/ChatBox';
import Input from './components/Input';


function App() {
  const [messages, setMessages] = useState([]);
  const chatBox = document.getElementById('chat-box');
  
  const handleSendMessage = (message, setDebounce, setError, setEMessage, setPM) => {
    // TODO : send user's message to model, to generate response.
    // TODO : prevent user from sending new message until bot responses.
      setMessages((prevMessages) => {
        // set debounce to wait for response.
        setDebounce(true);
        
        // set placeholder message.
        setPM("RibAI is thinking...")
        const updatedMessages = [...prevMessages, { text: message, sender: 'user' }];
        
        // scroll to bottom after updated state.
        if (chatBox) {
            setTimeout(() => {
              chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
            }, 100);
        }

        return updatedMessages;
    });


    // TODO : get bot response, parse to messages.
    setTimeout(() => {
      const response = "Typical Response";
      setMessages((prevMessages) => {
          // got response, remove debounce.
          setDebounce(false);
           // set placeholder message.
          setPM("Enter your message")

          // remove errors
          setError(false);
          const updatedMessages = [...prevMessages, { text: response, sender: 'ribai' }];

          // scroll to bottom after updated state.
          if (chatBox) {
              setTimeout(() => {
                chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
              }, 100);
          }

          return updatedMessages;
      });
    }, 5000);
  };

  return (
    <div className="App">
      <div className="chat-section">
        <ChatBox messages={messages}></ChatBox>
        <Input onSendMessage={handleSendMessage} />
      </div>  
    </div>
  );
}
export default App;
