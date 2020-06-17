import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const repos = await api.post('/repositories', {

      url: "http://github.com/...",
      title: "Desafio ReactJS",
      techs: [
        "Node.js",
        "ReactJs",
        "React Native"
      ]

    })

    const repository = repos.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const repoIndex = repositories.findIndex(repo => repo.id === id);
    api.delete(`/repositories/${id}`)
    setRepositories(repositories.splice(repositories, repoIndex));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
