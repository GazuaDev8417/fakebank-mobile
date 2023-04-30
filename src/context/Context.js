import { createContext, useState } from "react"
import axios from 'axios'
import { url } from "../constants/urls"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const Context = createContext()


const AuthProvider = (props)=>{
  const [user, setUser] = useState({})


  const getUser = async()=>{
    const id = await AsyncStorage.getItem('id')

    axios.get(`${url}/accounts/${id}`).then(res=>{
      setUser(res.data)
    }).catch(err=>{
      alert(err.response.data)
    })
  }
  
  
  const states = { user }
  const setters = {  }
  const requests = { getUser }

  return(
      <Context.Provider value={{ states, setters, requests }}>
          {props.children}
      </Context.Provider>
  )
}
export default AuthProvider