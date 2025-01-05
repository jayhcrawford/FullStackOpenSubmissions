import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const user = useSelector((state) => state.login.user)
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    if (user) {
      getAllUsers().then((response) => {
        setAllUsers(response)
        console.log('Refresh at useEffect 777')
      })
    }
  }, [user])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td style={{ width: '5em' }}>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </td>
                  <td style={{ textAlign: 'right' }}>{user.blogs.length}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Users
