import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import "./style.scss";

function Notes() {

  const [user, setUser] = useContext(UserContext);
  const [notes, setNotes] = useState("");

  function handleBlur(event) {
    setNotes(event.target.innerText);
    console.log("event.target.innerText : ", event.target.innerText);
    setUser({
      ...user,
      currentGameData: 
        {
          ...user.currentGameData,
          Gameroom: {
            ...user.currentGameData.Gameroom,
            notes: event.target.innerText
          }
        }
    });
  }

  return (
    <div
      className='notes'
      contentEditable="true"
      onBlur={handleBlur}
    >
    {notes}
    </div>
  )
}

export default Notes 