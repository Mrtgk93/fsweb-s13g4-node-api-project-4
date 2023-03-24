const uuid = require("uuid");

//farklı id ler oluşturabilmek için uuid kullandık
function getId() {
  return uuid.v1();
}

const initialUsers = () => {
  return [
    { id: getId(), userName: "Ed Carter", password: "1234" },
    { id: getId(), userName: "Mary Edwards", password: "12345" },
    { id: getId(), userName: "Mert", password: "123456" },
    { id: getId(), userName: "Ali", password: "123456" },
  ];
};

let users = initialUsers();

function getAllUsers() {
  return users;
}

function createNewUSer(user) {
  user.id = getId();
  users.push(user);
  return user;
}

function findUser(user) {
  let isFind = false;
  for (let i = 0; i < users.length; i++) {
    const item = users[i];
    if (item.userName === user.userName && item.password === user.password) {
      isFind = true;
      break;
    }
  }
  return isFind;
}

function checkIsSameUserName(uN) {
  let isSameUserNameExist = users.find((item) => item.userName === uN);
  return !!isSameUserNameExist;
}

module.exports = { getAllUsers, findUser, checkIsSameUserName, createNewUSer };
