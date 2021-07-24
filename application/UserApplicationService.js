import User from "../domain/User/User.js";

export default class UserApplicationService {
  constructor(repository) {
    this.repository = repository;
  }

  newUser(...values) {
    return new User(...values);
  }

  async save(user) {
    const res = await this.all();
    res.forEach((u) => {
      if (user.equals(u)) {
        throw new Error("user already exists");
      }
    });
    await this.repository.create(user.serialize());
    return user;
  }

  async all() {
    try {
      const all = await this.repository.all();
      const users = all;
      return users.map((u) => {
        return new User(u.name, u.email);
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
