import './App.css';
import {useState, useEffect} from 'react'
import io from 'socket.io-client'
import ChildComp from './ChildComp'

function App() {
  const [socket] = useState(()=>io(':8000'))
  //const socket = io(':8000')
  
  const [msg, setMsg] = useState("")
  useEffect(()=>{
      console.log("App loaded")
      
      socket.on("connect", ()=>{
        console.log("connecting socket")
        
        socket.on("FromAPI", data=>{
          console.log(data)
          setMsg(data)
          socket.emit("event_from_client", "Client received a new timestamp")
        })
      })

      return ()=>{socket.disconnect(true)}
      
    }, [socket])
    
  return (<>
    <p>Socket Test</p>
    <ChildComp msg={msg}/>
  </>);
}

export default App;
