import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import CreateArea from "./CreateArea";

function Note() {
  const location = useLocation();
  const userID = location.state?.userID; // Accessing userID from location state
  const username = location.state?.username; // Accessing username from location state

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (userID) {
      fetchNotes(); // Fetch notes only if userID is available
    }
  }, [userID]); // Call fetchNotes whenever userID changes

  async function fetchNotes() {
    try {
      const response = await fetch(`/notes?userID=${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const notesData = await response.json();
      setNotes(notesData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  async function deleteNote(id, index, event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    try {
      const response = await fetch(`/notes/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
      deleteN(index);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  

  function deleteN(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <h3 className="displayuser">Hi {username}</h3>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        //console.log(noteItem);
        return (
          <div className="note" key={index}>
            <h1>{noteItem.title}</h1>
            <p>{noteItem.content}</p>
            <form><button className="delbut" onClick={(event) => deleteNote(noteItem.noteid, index, event)}>
  <small>DELETE</small>
</button>
</form>
          </div>
        );
      })}
    </div>
  );
}

export default Note;
