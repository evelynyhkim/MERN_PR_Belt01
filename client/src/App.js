import './App.css';
import {useState, useEffect} from 'react'
import io from 'socket.io-client'
import ChildComp from './ChildComp'

//REFERENCE PROJECT
//https://www.valentinog.com/blog/socket-react/#closing-the-socketio-connection-in-useeffect
//FURTHER READING
//https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
//
function App() {
  const [socket] = useState(()=>io(':8000'))
  //const socket = io(':8000')
  
  const [msg, setMsg] = useState("")
  useEffect(()=>{
      console.log("App (re)rendered")
      
      socket.on("connect", ()=>{
        console.log("connecting socket")
        
        socket.on("FromAPI", data=>{
          //console.log(data)
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
