import { useState, useEffect } from 'react'
import { db } from './firebase'

//to get data from firebase
export function UseFirestore(){

    const [users,setusers]=useState([])

    useEffect(() => {
        const unsubscribe=db.collection('User').onSnapshot(snap=>{
            const fetch = snap.docs.map(doc=>{
                return {...doc.data(),id:doc.id}
            })
            setusers(fetch)
            console.log(fetch)
        })
        //active listener
        return unsubscribe
        }, [])

        return{users}
}
