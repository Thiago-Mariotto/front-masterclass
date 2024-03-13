import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    axios.get('https://backend-prod-trybe.up.railway.app/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const handleSubmit = (e) => {
    console.log('submit', name, age);
    e.preventDefault();
    axios.post('https://backend-prod-trybe.up.railway.app/users', { name, age })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Cadastrar-se</h1>
      <form>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <label>Age</label>
        <input type="number" name="age" value={age} onChange={e => setAge(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Add</button>
      </form>

      <h1>Pessoas cadastradas</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.age}</li>
        ))}
      </ul>
    </>
  )
}

export default App
