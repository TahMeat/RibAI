import { useState } from 'react';
import axios from 'axios';

import './App.css';
import ChatBox from './components/ChatBox';
import Input from './components/Input';


function App() {
  const [messages, setMessages] = useState([]);
  const chatBox = document.getElementById('chat-box');
  const handleSendMessage = async (message, setDebounce, setError, setEMessage, setPM) => {
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

  try {
    // send to aws api
    const response = await axios.post('https://ccn30r4dr0.execute-api.us-east-2.amazonaws.com/RibAI_V1/response', {
      "text": message
    });
    const responseBody = JSON.parse(response.data.body)
    const botResponse = responseBody.response.replace(/^"|"$/g, '');;

    setMessages((prevMessages) => {
      setDebounce(false);
      setError(false);
      setPM("Enter your message");
      const updatedMessages = [...prevMessages, { text: botResponse, sender: 'ribai' }];
      
      // scroll to bottom after updating state
      if (chatBox) {
        setTimeout(() => {
          chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
        }, 100);
      }

      return updatedMessages;
    });
  }

  catch (error) {
    console.error("Error fetching response:", error);
    setDebounce(false);
    setError(true);
    setPM("Enter your message");
    setEMessage("Error fetching response, please try again.");
  }

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
