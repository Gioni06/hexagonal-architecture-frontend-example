import User from '../../domain/User.js'

export default class UserApplicationService {
    constructor(repository) {
      this.repository = repository
    }

    newUser(name, email, id) {
        return new User(name, email, id)
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
          const users = all
          return users.map((u) => {
              return new User(u.name, u.email, u.id)
          })
        } catch(e) {
            console.log(e)
          return []
        }
    }
  }