const express = require("express");
const app = express();
const crypto = require("crypto");
// console.log(crypto.randomUUID());

app.use(express.json());
const PORT = 3001;

const uuidRandom = crypto.randomUUID();
const gameId = uuidRandom;
let joinId = "";
let playerOne = [];
let playerTwo = [];
let result = "";
let players = [];

function winner(playerOne, playerTwo) {
  if (playerOne.move === "Rock") {
    if (playerOne.move === "Rock" && playerTwo.move === "Scissor") {
      result = playerOne.name + " is the winner";
    } else if (playerOne.move === playerTwo.move) {
      result = "The match is a draw, both players picked: " + playerOne.move;
    } else {
      result = playerTwo.name + " is the winner";
    }
    return result;
  }
  if (playerOne.move === "Scissor") {
    if (playerOne.move === "Scissor" && playerTwo.move === "Paper") {
      result = playerOne.name + " is the winner";
    } else if (playerOne.move === playerTwo.move) {
      result = "The match is a draw, both players picked: " + playerOne.move;
    } else {
      result = playerTwo.name + " is the winner";
    }
    return result;
  }
  if (playerOne.move === "Paper") {
    if (playerOne.move === "Paper" && playerTwo.move === "Rock") {
      result = playerOne.name + " is the winner";
    } else if (playerOne.move === playerTwo.move) {
      result = "The game is a draw, both players picked: " + playerOne.move;
    } else {
      result = playerTwo.name + " is the winner";
    }
    return result;
  }
}

app.get("/", (req, res) => {
  return res.status(200).send("Hello world");
});

app.post("/api/games", (req, res) => {
  playerOne.name = req.body.name;
  playerOne.state = "";
  players.push(playerOne.name);
  return res.status(201).send({
    message: "Welcome " + playerOne.name + ", the gameId is: " + gameId,
  });
});

app.post("/api/games/:id/join", (req, res) => {
  joinId = req.params.id;
  playerTwo.name = req.body.name;
  playerTwo.state = "";
  players.push(playerTwo.name);

  if (joinId === gameId) {
    if (players.length < 3) {
      return res.status(201).send({
        message: "Welcome " + playerTwo.name + ", " + playerOne.name + " is waiting for you."
      });
    } else {
      res.status(400).send("Game room is full");
    }
  } else {
    res.status(404).send({
      message: "ERROR: Wrong gameId",
    });
  }
});

app.post("/api/games/:id/move", (req, res) => {
  joinId = req.params.id;
  if (joinId === gameId) {
    if (playerOne.name === req.body.name) {
      playerOne.move = req.body.move;
      playerOne.state = "READY";
      return res.status(201).send({
        message: playerOne.name + " you chose " + playerOne.move,
      });
    }
    if (playerTwo.name === req.body.name) {
      playerTwo.move = req.body.move;
      playerTwo.state = "READY";
      return res.status(201).send({
        message: playerTwo.name + " you chose " + playerTwo.move,
      });
    }
  } else {
    res.status(404).send({
      message: "ERROR: Wrong gameId",
    });
  }
});

app.get("/api/games/:id", (req, res) => {
  joinId = req.params.id;
  if (joinId === gameId) {
    if (playerOne.state === "") {
      return res
        .status(200)
        .send("Waiting for " + playerOne.name + " to make a move");
    }
    if (playerTwo.state === "") {
      return res
        .status(200)
        .send("Waiting for " + playerTwo.name + " to make a move");
    }
    winner(playerOne, playerTwo);
    return res.status(200).send(result + ", the game is now finished");
  } else {
    res.status(404).send("ERROR: Wrong gameId");
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
