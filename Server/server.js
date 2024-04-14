const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pg = require("pg");

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "securescript",
  password: "3030",
  port: 5432,
});
db.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());



app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
      );
      const id = await db.query(
        "SELECT id from users where username= ($1)",
        [username]
      );
      res.json({ success:true,message:"successfull login!",ID:id.rows[0].id,username:username });

    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/notes", async (req, res) => {
  const userID=req.body.userID;
  const title = req.body.note.title;
  const content = req.body.note.content;
  //console.log(req.body);
  try {
    const result = await db.query(
      "INSERT INTO notes (userid,title,content) VALUES ($1, $2,$3)",
      [userID,title, content]
    );
    res.status(201).send("Note added successfully"); // Send a success response
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error"); // Send an error response
  }
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      

      if (password === storedPassword) {
        //console.log(user.id);
        res.json({ success:true,message:"successfull login!",ID:user.id,username:username});
 // Send a JSON response indicating success
        
      } else {
        res.status(401).send("Incorrect Password");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/notes", async (req, res) => {
  //console.log(req.query);
  const userId = req.query.userID; // Accessing userID from query parameters
  try {
    // Query the database using userId
    const result = await db.query("SELECT * FROM notes WHERE userid = $1", [userId]);
    //console.log(result);
    res.json(result.rows); // Send user's notes as JSON response
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error"); // Send an error response
  }
});
// Assuming you have set up your Express app and database connection

// DELETE endpoint to delete a note
app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  //console.log(noteId);
  try {
    // Perform a database query to delete the note with the given ID
    await db.query("DELETE FROM notes WHERE noteid = $1", [noteId]);
    res.status(204).send(); // Send a success response
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error"); // Send an error response
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
