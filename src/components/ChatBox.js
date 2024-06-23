import './ChatBox.css';

const ChatBox = ({messages}) => {
  return (
    <div className="chat-container">
      <div className="chat-box" id="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;