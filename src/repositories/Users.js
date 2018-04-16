class Users {
  constructor(users = []) {
    this.users = users;
  }

  findByEmailAndPassword(email,password) {
    return this.users.find(x=> x.email == email && x.password == password);
  }
}

module.exports = Users;