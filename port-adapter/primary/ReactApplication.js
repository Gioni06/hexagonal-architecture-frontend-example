export function ReactApplication(svc) {
  const html = htm.bind(React.createElement);

  const App = (props) => {
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState();
    const formRef = React.useRef();
    const nameRef = React.useRef();
    const emailRef = React.useRef();

    React.useEffect(() => {
      (async () => {
        const usrs = await svc.all();
        setUsers(usrs);
      })();
    }, []);

    async function saveUser(e) {
      e.preventDefault();
      setError();
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      try {
        const user = svc.newUser(name, email);
        await svc.save(user);
        setUsers((prev) => {
          return [...prev, user];
        });
      } catch (e) {
        setError(e);
        window.setTimeout(() => {
          setError(undefined);
        }, 3000);
      }
    }

    return html`
    <div className="container mx-auto px-4 max-w-xl">
      <form ref=${formRef} className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input ref=${nameRef} type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input ref=${emailRef} type="text" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        <button type="submit" onClick=${saveUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">save</button>
      </form>

      ${
        error
          ? html`
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Error: </strong>
                <span class="block sm:inline">${error.message}</span>
              </div>
            `
          : html``
      }
      
      ${
        users
          ? html`
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">E-Mail</th>
                    <th className="px-4 py-2 text-left">ID</th>
                  </tr>
                </thead>
                <tbody>
                  ${users.map((u) => {
                    return html`
                      <tr>
                        <td className="border px-4 py-2">${u.name()}</td>
                        <td className="border px-4 py-2">${u.email()}</td>
                        <td className="border px-4 py-2 text-xs">${u.id()}</td>
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
  };

  ReactDOM.render(html`<${App} />`, document.querySelector("#react-root"));
}
