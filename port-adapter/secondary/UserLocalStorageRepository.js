export default class UserLocalStorageRepository {
  constructor() {
    this.store = window.localStorage;
    this.storageKey = "users";
    if (this.store.getItem(this.storageKey)) {
      const current = JSON.parse(this.store.getItem(this.storageKey));
      if (!Array.isArray(current)) {
        this.store.setItem(this.storageKey, JSON.stringify([]));
      }
    } else {
      this.store.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  async create(user) {
    const current = JSON.parse(this.store.getItem(this.storageKey));
    current.push(user);
    this.store.setItem(this.storageKey, JSON.stringify(current));
  }

  async read(id) {
    const current = JSON.parse(this.store.getItem(this.storageKey));
    return current.find((u) => {
      return u._id === id;
    });
  }

  async all() {
    return JSON.parse(this.store.getItem(this.storageKey));
  }
}
