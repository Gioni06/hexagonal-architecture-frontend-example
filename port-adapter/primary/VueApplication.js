export function VueApplication(svc) {
    Vue.component('vue-app', {
        data: function () {
          return {
            users: [],
            name: "",
            email: "",
            error: null,
          }
        },
        methods: {
            saveUser: async function(e) {
                e.preventDefault()
                this.error = null
                const name = this.name
                const email = this.email
                try {
                    const user = svc.newUser(name, email)
                    await svc.save(user)
                    this.users.push(user)
                } catch(e) {
                    this.error = e
                    window.setTimeout(() => {
                        this.error = null
                    }, 3000)
                }
            }
        },
        created: async function() {
            this.users = await svc.all()
        },
        template: `
            <div class="container mx-auto px-4 max-w-xl">
                <form class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input v-model="name" type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                    
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input v-model="email" type="text" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
    
                    <button type="submit" v-on:click="saveUser" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">save</button>
                </form>

                <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Error: </strong>
                    <span class="block sm:inline">{{error.message}}</span>
                </div>
                <table class="table-auto" v-if="users">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">E-Mail</th>
                            <th class="px-4 py-2 text-left">ID</th>
                        </tr>
                    </thead>
                    <tbody>

                    <tr v-for="u in users" :key="u.id()">
                        <td class="border px-4 py-2">{{u.name()}}</td>
                        <td class="border px-4 py-2">{{u.email()}}</td>
                        <td class="border px-4 py-2 text-xs">{{u.id()}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        `
    })
    
    new Vue({ el: '#react-root', template: '<vue-app></vue-app>' })
}