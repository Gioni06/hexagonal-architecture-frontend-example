import User from '../../domain/User.js'

export default class UserApplicationService {
    constructor(repository) {
      this.repository = repository
    }

    newUser(name, email) {
        return new User(name, email)
    }
    
    save(user) {
      this.all().forEach(u => {
          if(user.equals(u)) {
              throw new Error("user already exists")
          }
      });
      this.repository.create(user.serialize())
      return user
    }
    
    all() {
        try {
          const all = this.repository.all()
          console.log(all)
          const users = all
          return users.map((u) => {
              return new User(u.name, u.email)
          })
        } catch(e) {
            console.log(e)
          return []
        }
    }
  }