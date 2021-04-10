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
  const [names, setNames] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room , setRoom] = useState("")
  const [prevData , setPreData]=useState(null)
  const ENDPOINT = 'http://13.233.154.141:5000/';
 
  

    useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    console.log(socket)

    setNames(name);
    setName(name);

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

  
  useEffect(()=>{
    const { room } = queryString.parse(window.location.search);
    setRoom(room)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6MTQ2LCJ0eXBlIjoidXNlciIsImlhdCI6MTYwNzQ5OTA2N30.ElDA6X2XtEXfYFBDB0VUjuEbd1E1-aBV2-ngabyKewg");
    
    const roomID = room
  console.log(roomID)
  
    var raw = JSON.stringify({
     "roomId": roomID
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
     redirect: 'follow'
    };
    
    fetch("http://13.233.154.141:5000/api/getRoomMessages", requestOptions)
      .then(response => response.json())
      .then(result =>{
        setPreData(result)
        
        console.log(result)})
      .catch(error => console.log('error', error));
         },[]); 


  return (
    <div className="outerContainer">
    {/* <TextContainer users={users} /> */}
      <div className="container">
          <InfoBar name={names} history={history} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}