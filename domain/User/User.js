import * as uuid from "https://cdn.skypack.dev/pin/uuid@v8.3.2-XAQ9X05vJqvKpZccxFGc/mode=imports,min/optimized/uuid.js";

function validateEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const res = reg.exec(String(email).toLowerCase());
  return res != null;
}

export default class User {
  static validate(name, email) {
    if (typeof name != "string" || name === "") {
      throw new Error("invariant error");
    }
    if (typeof email != "string" || email === "") {
      throw new Error("invariant error");
    }
    if (!validateEmail(email)) {
      throw new Error("invalid email error");
    }
  }

  constructor(name, email) {
    User.validate(name, email);
    this._name = name;
    this._email = email;
    this._id = uuid.v4();
    this._emailDomain = this._email.split("@")[1];
    this._emailUsername = this._email.split("@")[0].split("+")[0];
    this._emailSuffix = this._email.split("@")[0].split("+")[1];
  }

  id() {
    return this._id;
  }

  name() {
    return this._name;
  }

  email() {
    return this._email;
  }

  equals(anotherUser) {
    return (
      this._emailDomain == anotherUser._emailDomain &&
      this._emailUsername === anotherUser._emailUsername
    );
  }

  serialize() {
    return {
      id: this.id(),
      name: this.name(),
      email: this.email(),
    };
  }
}
