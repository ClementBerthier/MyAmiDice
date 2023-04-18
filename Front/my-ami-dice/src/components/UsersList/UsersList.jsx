import { useEffect, useState } from 'react';
import api from '../../api';
import UserModal from '../UserModal/UserModal'
import './style.scss';


function UsersList() { 
  
  const [allUsers, setAllUsers] = useState([]);

  function handleOnDelete(userId) {
    setAllUsers(allUsers.filter(u => u.id !== userId))
  }

  useEffect(() => {
    async function getAllUsers(){
      try {
        const response = await api.get("/users/getall")
        setAllUsers(response.data)        
        console.log("alluser", response.data)
          } catch (error) {
          throw new Error (error)
          }
      }
      getAllUsers()
  }, [])
  
  return (
    <div className='usersList-container'>
        <div className='users-list'>
            {allUsers.map((user) => (
              <UserModal 
                key = {user.id}
                id = {user.id}
                pseudo = {user.pseudo}
                email = {user.email}
                firstname = {user.firstname}
                lastname= {user.lastname}
                onDelete={handleOnDelete}
              />
            ))}
        </div>
    </div>
  )
}
 



export default UsersList