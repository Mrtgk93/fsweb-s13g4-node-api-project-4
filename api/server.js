const express = require("express");
const cors = require("cors");
const {
  logger,
  checkSameUserName,
  validateNewUser,
  isValidUser,
} = require("./middleware");
const userModel = require("./user-model");

const server = express();
server.use(express.json());
server.use(logger);
server.use(cors());

server.get("/api/kullanicilar", (req, res, next) => {
  res.json(userModel.getAllUsers());
});

server.post(
  "/api/kayitol",
  checkSameUserName,
  validateNewUser,
  (req, res, next) => {
    let user = req.user;
    let createdUser = userModel.createNewUSer(user);
    res.status(201).json(createdUser);
  }
);

server.post("/api/giris", isValidUser, (req, res, next) => {
  res.status(201).json({ message: "hosgeldin " + req.body.userName });
});

server.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).json({
    customMessage: "bir hata olustu,server noktasından bu mesaj yazıldı",
    message: err.message,
  });
});
module.exports = server;
