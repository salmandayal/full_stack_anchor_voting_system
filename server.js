const express = require("express");
const app = express();
const { validationResult } = require("express-validator");
const path = require("path");
const { getCount } = require("./services/vote");
const {
  validateCastVote,
  validateCreateVote,
} = require("./validations/voteVS");
const { create } = require("domain");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Opika Voting System");
});

app.get("/api/getAllTopic", async (req, res) => {
  const allTopics = await getAllTopic();
  res.json({ data: allTopics }).status(200);
});

app.get("/api/getCount", async (req, res) => {
  if (!req.query.voteTopic) {
    return res.status(400).json({ error: "Topic not found" });
  }
  const voteCounts = await getCount(req.query.voteTopic);
  res.json({ data: voteCounts }).status(200);
});

app.post("/api/castVote", validateCastVote, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const result = await castVote(req.body.voteTopic, req.body.option);
  res.json({ message: result }).status(200);
});

app.post("/api/createVote", validateCreateVote, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const result = await createVoteTopic(req.body.voteTopic, req.body.options);
  res.json({ message: result }).status(200);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
