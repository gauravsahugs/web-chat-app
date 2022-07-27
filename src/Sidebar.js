/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useStateValue } from './StateProvider';

import "./Sidebar.css";
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import db from "./firebase";

function Sidebar(){
const[rooms, setRooms ] = useState([]);
const [{user }, dispatch] = useStateValue();


useEffect(()=>{
const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
    setRooms(snapshot.docs.map(doc =>
        ({
            id: doc.id,
            data: doc.data(),
        })
        ))
)) ; return () => {
    unsubscribe(); 
}
}, []);

    return(
<div className="sidebar">
<div className="sidebar_header">
<IconButton >
<Avatar src={user?.photoURL} />
</IconButton>

<div className="sidebar_headerRight">
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

<div className="sidebar_search">
<SearchOutlined />
<input placeholder="search or start new chat" type="text" />
</div>

<div className="sidebar_chats">
<SidebarChat addNewChat />
{rooms.map((room) => (
    <SidebarChat key={room.id} id={room.id}
    name={room.data.name} />
    ))}
</div>
</div>
    );
   }

export default Sidebar;

