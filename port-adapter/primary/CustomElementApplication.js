import { LitElement, html } from "https://cdn.skypack.dev/lit-element";

export function CustomElementApplication(svc) {
  class App extends LitElement {
    static get properties() {
      return {
        users: { type: Array, attribute: false },
        error: { attribute: false, type: Object },
      };
    }

    constructor() {
      super();
      this.error = undefined;
    }

    connectedCallback() {
      super.connectedCallback();
      this.users = svc
        .all()
        .then((users) => (this.users = users))
        .catch((e) => (this.error = e));
    }

    async saveUser(e) {
      e.preventDefault();
      this.error = undefined;
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      try {
        const user = svc.newUser(name, email);
        await svc.save(user);
        this.users.push(user);
        this.requestUpdate();
      } catch (e) {
        this.error = e;
        window.setTimeout(() => {
          this.error = undefined;
        }, 3000);
      }
    }

    render() {
      return html`
                <div class="container mx-auto px-4 max-w-xl">
                    <form class="mb-4" @submit=${this.saveUser}>
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                        
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input v-model="email" type="text" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        
                        <button type="submit" v-on:click="saveUser" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">save</button>
                    </form>

                    ${
                      this.error
                        ? html`
                            <div
                              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                              role="alert"
                            >
                              <strong class="font-bold">Error: </strong>
                              <span class="block sm:inline"
                                >${this.error.message}</span
                              >
                            </div>
                          `
                        : html``
                    }

                    ${
                      this.users
                        ? html`
                            <table class="table-auto">
                              <thead>
                                <tr>
                                  <th class="px-4 py-2 text-left">Name</th>
                                  <th class="px-4 py-2 text-left">E-Mail</th>
                                  <th class="px-4 py-2 text-left">ID</th>
                                </tr>
                              </thead>
                              <tbody>
                                ${this.users.map((u) => {
                                  return html`
                                    <tr>
                                      <td class="border px-4 py-2">
                                        ${u.name()}
                                      </td>
                                      <td class="border px-4 py-2">
                                        ${u.email()}
                                      </td>
                                      <td class="border px-4 py-2 text-xs">
                                        ${u.id()}
                                      </td>
                                    </tr>
                                  `;
                                })}
                              </tbody>
                            </table>
                          `
                        : html``
                    }
                </div>
            `;
    }

    createRenderRoot() {
      return this;
    }
  }
  customElements.define("x-app", App);

  const root = document.querySelector("#react-root");
  const app = document.createElement("x-app");
  root.appendChild(app);
}
