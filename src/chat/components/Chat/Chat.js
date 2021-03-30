import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


import {InfoBar} from '../InfoBar/InfoBar';
import {Input} from '../Input/Input';
import {Messages} from '../Messages/Messages';
import {TextContainer} from '../TextContainer/TextContainer'

import './Chat.css';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

let socket;

export const Chat = ({ location }) => {
  // const { names, rooms } = useLocation().state;
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://13.233.154.141:5000/';


  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    console.log(socket)

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(msgs => [ ...msgs, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const history = useHistory();


  return (
    <div className="outerContainer">
    {/* <TextContainer users={users} /> */}
      <div className="container">
          <InfoBar room={room} history={history} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}