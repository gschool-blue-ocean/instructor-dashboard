import React, { useEffect, useState } from 'react'
let Test = () => {
    const [userId, setUserId] = useState('')
    useEffect(() => {
        fetch(`/api/users`)
            .then((res) => res.json())
            .then((users) => {
                const userEmailsObj = users.map((user) => user)
                // console.log(userEmailsObj)
                setUserId(userEmailsObj[0].first_name)
            })
    }, [userId])
    return <h1>{userId} hello</h1>
}
export default Test
