import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../../app/rtkServiceApi'

import React from 'react'
import styles from './User.module.css'

const User = () => {

    const { data, isLoading, error } = useGetUsersQuery()
    const [ deleteUser ] = useDeleteUserMutation()
    
    const [ addUser ] = useAddUserMutation()

    const user = {
        "id": 2, "firstName": "Tony", "lastName": "Gupta"
    }
    const sendData = async() => {
        await addUser(user)
    }

    const deletingUser = async() => {
        await deleteUser(2)
    }

    const getData = () => {
        if (error) return <>Oh no, there was an error</>
        else if (isLoading) return <>Loading...</>
        else if (data)
            return data.map((user, index) => {
                return (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>{user.id}</p>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                    </div>
                )
                
            })
        return null
    }

    return (
        <div className={styles.userDiv}>
            <h1>Users</h1>
            <div className={styles.subDiv}>
                {getData()}
            </div>
            <button onClick={sendData} >Send</button>
            <button onClick={deletingUser} >Delete</button>
        </div>
    )
}

export default User
