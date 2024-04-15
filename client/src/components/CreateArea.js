import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

function CreateArea(props) {
  const location = useLocation();
  const userID = location.state?.userID;
  //console.log(userID);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote() {
    try {
      const response = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: userID,
          note: note
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      // Clear the form after successful submission
      setNote({
        title: "",
        content: ""
      });

      // Trigger the parent component's onAdd function to update UI with new note
      props.onAdd(note);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div>
      <form className="noteform">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button type="button" onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

