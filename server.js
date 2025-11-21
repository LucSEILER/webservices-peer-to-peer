const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let rooms = [];

app.post("/rooms", (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).send("Missing id or name");

  rooms = rooms.filter((r) => r.id !== id);

  rooms.push({ id, name, timestamp: Date.now() });
  res.send({ success: true });
});

app.get("/rooms", (req, res) => {
  const now = Date.now();
  rooms = rooms.filter((r) => now - r.timestamp < 3600 * 1000);
  res.send(rooms);
});

app.listen(3000, () => console.log("Room server running on port 3000, http://localhost:3000"));