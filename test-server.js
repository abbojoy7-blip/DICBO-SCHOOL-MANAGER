const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Test server running");
});

app.listen(5001, "0.0.0.0", () => {
  console.log("TEST SERVER RUNNING ON PORT 5001");
});