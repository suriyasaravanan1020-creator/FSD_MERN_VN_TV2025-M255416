const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/get-user", (req, res) => {
  res.send("we are user");
});
app.post("/add-user", (req, res) => {
  res.send("user is created");
});
app.put("/update-user", (req, res) => {
  res.send("user is updated");
});
app.delete("/delete-user", (req, res) => {
  res.send("user is deleted");
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
