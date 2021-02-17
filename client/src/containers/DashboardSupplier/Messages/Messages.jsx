import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './Messages.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSupplierChats,
  supplierReadMessage,
  sendMessage,
} from '../../../actions/chat';
import audioTone from './../../../assests/juntos-607.mp3';

const Messages = () => {
  const dispatch = useDispatch();

  const authSupplier = useSelector((state) => state.authSupplier);
  const chat = useSelector((state) => state.chat);

  const id = authSupplier.supplier._id;
  const users = chat.suppliersideChats;

  const [singalChat, setSingalChat] = useState({});
  const [messageText, setMessageText] = useState('');
  const userHasRead = false;
  const supplierHasRead = true;

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getSupplierChats(id));
    Object.keys(singalChat).length !== 0 &&
      dispatch(
        supplierReadMessage(singalChat.user._id, singalChat.supplier._id)
      );
  }, [authSupplier.supplier, singalChat]);

  function toggleSidebar() {
    const div = document.querySelector('.chat-sidebar');
    div.classList.toggle('hide-sidebar');
  }

  function getSingalChat(id) {
    setSingalChat(users.find((user) => user.user._id === id));
    toggleSidebar();
  }

  const side = 'supplier';
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
    document.getElementById('msg').value = '';
  };

  const playSound = () => {
    let newAudio = new Audio(audioTone);
    newAudio.play();
  };

  return (
    <>
      <div class="chat-container">
        <header class="chat-header">
          <h1>Insleek Chatboard</h1>
          <p
            onClick={() => {
              toggleSidebar();
            }}
          >
            Back
          </p>
        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3>Chat with Users</h3>
            <ul id="users">
              {users.map((user) => {
                const numOfUnread = user.message.filter(function (el) {
                  return el.supplierHasRead === false;
                });
                return (
                  <li
                    className={`chat-sidebar__user ${
                      Object.keys(singalChat).length !== 0 &&
                      singalChat.user._id === user.user._id &&
                      'back-change'
                    }`}
                    onClick={() => {
                      playSound();
                      getSingalChat(user.user._id);
                    }}
                  >
                    <div className="round-profile">
                      {user.user.firstName.charAt(0)}
                    </div>

                    <div className="chat-list-profile">
                      <p style={{ marginTop: '0.3rem' }}>
                        {user.user.firstName} {user.user.lastName}
                      </p>
                      <div className="part-two">
                        <p>
                          {user.message.slice(-1)[0].message.substr(0, 20)}..
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
          <div class="chat-messages">
            {Object.keys(singalChat).length === 0 && (
              <p className="no-message-text">
                Please select any chat to start sending messages
              </p>
            )}
            {Object.keys(singalChat).length !== 0 &&
              singalChat.message.map((msg) => {
                return (
                  <div
                    className={`message ${
                      msg.side === 'supplier' ? 'message-you' : ''
                    }`}
                  >
                    <p class="meta">
                      {msg.side === 'supplier'
                        ? 'You'
                        : `${singalChat.user.firstName} ${singalChat.user.lastName}`}
                      <span>
                        {' '}
                        {moment(msg.createdAt).format('D MMM, h:mm a')}
                      </span>
                    </p>

                    <p class="text">{msg.message}</p>
                  </div>
                );
              })}
          </div>
        </main>
        <div class="chat-form-container">
          <form id="chat-form" onSubmit={(e) => onSubmit(e)}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autocomplete="off"
              disabled={Object.keys(singalChat).length === 0}
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
            />
            <button className="btn">
              <i class="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
