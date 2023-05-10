import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUser] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])


  const handleFormSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email }

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('insite post request', data)

        const newUsers =[...users,data];
        setUser(newUsers)
      })
  }

  console.log(users);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name='name' placeholder='name' />
        <br />
        <input type="email" name='email' placeholder='email' />
        <br />
        <input type="submit" value='Addmuser' />
      </form>
      <h1>Client site is runing on your total user {users.length}</h1>
      {
        users.map(user=><p key={user.id}>{user.id} {user.name} {user.email}</p>)
      }
    </>
  )
}

export default App
