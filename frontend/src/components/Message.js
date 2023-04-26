import './Message.css';

const Message = ({ msg, type }) => {
  return (
    <div className={`Message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
