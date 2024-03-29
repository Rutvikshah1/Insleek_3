import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, getUserChats, userReadMessage } from '../../actions/chat';
import Navbar from '../../components/Navbar/Navbar';
import audioTone from './../../assests/audio/juntos-607.mp3';
// import io from 'socket.io-client';
import './UserMessages.scss';

// let socket;
const UserMessages = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const isAuthenticated = authUser.isAuthenticated;

  const suppliers = useSelector((state) => state.chat.usersideChats);
  const id = authUser.user._id;

  const [singalChat, setSingalChat] = useState({});
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const userHasRead = true;
  const supplierHasRead = false;

  // const ENDPOINT = 'http://localhost:5000';

  //Socket Connection
  // useEffect(() => {
  //   socket = io(ENDPOINT, {
  //     transports: ['websocket', 'polling', 'flashsocket'],
  //   });
  //   socket.emit('join', {}, () => {});
  //   return () => {
  //     socket.emit('disconnect');
  //     socket.off();
  //   };
  // }, [ENDPOINT]);

  //Socket message
  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  useEffect(() => {
    dispatch(getUserChats(id));
    Object.keys(singalChat).length !== 0 &&
      dispatch(userReadMessage(singalChat.user._id, singalChat.supplier._id));
  }, [authUser.user, singalChat]);

  function toggleSidebar() {
    const div = document.querySelector('.chat-sidebar');
    div.classList.toggle('hide-sidebar');
  }

  function getSingalChat(id) {
    setSingalChat(suppliers.find((supplier) => supplier.supplier._id === id));
    toggleSidebar();
  }

  const side = 'user';
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendMessage(
        singalChat.user._id,
        singalChat.supplier,
        messageText,
        side,
        userHasRead,
        supplierHasRead
      )
    );
    setMessages([...messages, messageText]);
    const div = document.querySelector('.chat-messages');
    div.scrollTop = div.scrollHeight;
    document.getElementById('msg').value = '';
  };

  const playSound = () => {
    let newAudio = new Audio(audioTone);
    newAudio.play();
  };

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="userside-block">
        <h4 className="userside-block__title">My Chats</h4>
      </div>
      <section className="user-side-chat">
        <p className="user-side-chat__profile-info-msg">
          You can always visit supplier profile by clicking on letter of their
          name in round shape!
        </p>
        <div className="chat-container user-chat-container">
          <header className="chat-header">
            <h1>Insleek ChatBoard</h1>
            <p
              onClick={() => {
                toggleSidebar();
              }}
            >
              Back
            </p>
          </header>
          <main className="chat-main">
            <div className="chat-sidebar">
              <h3>Chats with suppliers</h3>
              <ul id="users">
                {suppliers.map((supplier, index) => {
                  const numOfUnread = supplier.message.filter(function (el) {
                    return el.userHasRead === false;
                  });

                  return (
                    <li
                      key={index}
                      className={`chat-sidebar__user ${
                        Object.keys(singalChat).length !== 0 &&
                        singalChat.supplier._id === supplier.supplier._id &&
                        'back-change'
                      }`}
                      onClick={() => {
                        playSound();
                        getSingalChat(supplier.supplier._id);
                      }}
                    >
                      <div
                        className="round-profile"
                        onClick={(e) => {
                          window.open(`/supplier/${supplier.supplier._id}`);
                          e.stopPropagation();
                        }}
                      >
                        {supplier.supplier.companyName.charAt(0)}
                      </div>

                      <div className="chat-list-profile">
                        <p>{supplier.supplier.companyName}</p>
                        <div className="part-two">
                          <p>
                            {supplier.message
                              .slice(-1)[0]
                              .message.substr(0, 20)}
                            ..
                            <span>
                              {numOfUnread.length > 0 ? numOfUnread.length : ''}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="chat-messages" id="messages">
              {Object.keys(singalChat).length === 0 && (
                <p className="no-message-text">
                  Please select any chat to start sending messages
                </p>
              )}

              {Object.keys(singalChat).length !== 0 &&
                singalChat.message.map((msg, index) => {
                  return (
                    <div
                      key={index}
                      className={`message ${
                        msg.side === 'user' ? 'message-you' : ''
                      }`}
                    >
                      <p className="meta">
                        {msg.side === 'user'
                          ? 'You'
                          : `${singalChat.supplier.companyName}`}
                        <span>
                          {' '}
                          {moment(msg.createdAt).format('D MMM, h:mm a')}
                        </span>
                      </p>

                      <p className="text">{msg.message}</p>
                    </div>
                  );
                })}

              {messages.map((msg, index) => (
                <div className="message message-you" key={index}>
                  <p className="meta">
                    You{' '}
                    <span> {moment(new Date()).format('D MMM, h:mm a')}</span>
                  </p>

                  <p className="text">{msg} </p>
                </div>
              ))}
            </div>
          </main>
          <div className="chat-form-container">
            <form id="chat-form" onSubmit={(e) => onSubmit(e)}>
              <input
                name="msg"
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                disabled={Object.keys(singalChat).length === 0}
                onChange={(e) => {
                  setMessageText(e.target.value);
                }}
                autoComplete="off"
              />
              <button className="btn">
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserMessages;
