const model = require("./user-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toLocaleString()}] method: ${req.method} url: ${
      req.url
    } ip: ${req.get("Origin")}`
  );
  next();
}

function checkSameUserName(req, res, next) {
  try {
    const { userName } = req.body;
    const isSame = !!userName && model.checkIsSameUserName(userName);
    if (isSame) {
      res.status(400).json({ message: "Aynı username mevcuttur" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateNewUser(req, res, next) {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.status(400).json({ message: "Eksik alan var" });
      next();
    } else {
      req.user = { userName: userName, password: password };
      next();
    }
  } catch (error) {
    next(error);
  }
}

function isValidUser(req, res, next) {
  try {
    let user = { userName: req.body.userName, password: req.body.password };
    const isExist = model.findUser(user);
    if (!isExist) {
      res.status(404).json({ message: "böyle bir kullanıcı yok" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { logger, checkSameUserName, validateNewUser, isValidUser };
