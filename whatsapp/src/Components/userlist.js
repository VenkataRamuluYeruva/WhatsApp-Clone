import React, { useState, useEffect } from "react";
import '../styles/UserList.css';
import User from "../Components/User";
import { useSelector,} from "react-redux";

export default function UserList() {
  const users = [];

  return (
    <div className="Userlist-Container">
      <div className="Userlist-Header">
        <p>Chats</p>
        <div className="Userlist-Header-Icons">
          <span className="material-symbols-outlined">edit_square</span>
          <span className="material-symbols-outlined">filter_list</span>
        </div>
      </div>
      <div className="Userlist-input">
        <form method="POST">
          <input type="search" className="search-user" placeholder="Search or start new chat" id="chat-user" name="chat-user" />
          <button type="submit" className="material-symbols-outlined">search</button>
        </form>
      </div>
      <div className="Userlist-List">
        {users && users.map((user) => (
          <User key={user.id} user={user} /> // Ensure you pass the user data to the User component
        ))}
      </div>
    </div>
  );
}
