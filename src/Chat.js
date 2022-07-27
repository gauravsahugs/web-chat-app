/* eslint-disable no-unused-vars */


import React from 'react';
import "./Chat.css"
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "./firebase";
import {AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";

function Chat() {

const [input, setInput]= useState ("");
const [seed, setSeed ] = useState("");
const {roomId } = useParams();
const [roomName, SetRoomName ] = useState("");
const [messages, setMessages ] = useState([]);
const [{user},dispatch ] = useStateValue();

useEffect(() => {
if (roomId){
    db.collection('rooms')
    .doc(roomId)
    .onSnapshot((snapshot) => SetRoomName
    (snapshot.data().name));
   
    db.collection("rooms")
    .doc(roomId)
    .collection("messages")
    .orderBy("timestamp","asc")
    .onSnapshot((snapshot) => 
    setMessages(snapshot.docs.map((doc) =>
    doc.data()))
    );
}

},[roomId]);


useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
},[])

const sendMessage = (e) => {
e.preventDefault();
console.log("you typed ",input);

db.collection("rooms")
.doc(roomId)
.collection("messages")
.add({
message: input,
name: user.displayName,
timestamp: firebase.firestore.FieldValue
.serverTimestamp(),});

setInput("");
};

  return (
    <div className='chat'>
    <div className='chat_header'>
<Avatar  src= {'https://avatars.dicebar.com/api/human/'+seed+'.svg'} />
<div className='chat_headerInfo'>
    <h3>{roomName}</h3>
    <p>
    {new Date(messages[messages.length-1]?.timestamp?.toDate())
.toUTCString()}
    </p>
</div>
<div className='chat_headerRight'>
<IconButton >
<DonutLargeIcon />
</IconButton>
<IconButton >
<ChatIcon />
</IconButton>
<IconButton >
<MoreVertIcon />
</IconButton>


</div>
    </div>

    <div className='chat_body'>
    {messages.map((message) => (
<p className={'chat_message '+message.name === user.displayName && +'chat_receiver'} >
<span className='chat_name' >
{message.name}</span>
{message.message}
<span className='chat_timestamp'>
{new Date(message.timestamp?.toDate())
.toUTCString()}
</span>
</p>
    ))}
    </div>
    <div className='chat_footer'>
    <InsertEmoticonIcon />
    <form>
        <input value={input} onChange={(e) =>setInput(e.target.value)} type="text" placeholder='type a message' />
        <button onClick={sendMessage}>Send</button>
    </form>
    <MicIcon />

    </div>
    </div>
  )
}

export default Chat;