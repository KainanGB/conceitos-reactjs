import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response =>{
      console.log(response.data)
      setRepository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Projeto Github Repositories",
      "url": "https://github.com/KainanGB?tab=repositories",
      "techs": ["JavaScript, ReactJS, NodeJS"]
    })

    console.log(response)
    const repository = response.data

    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    const repository = repositories.filter(repository => repository.id !== id)

    setRepository(repository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li 
        key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
