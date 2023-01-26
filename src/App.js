import './App.css';
import Child from './Child'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect( ()=> {
    axios.get("/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4").then(res=>{
      console.log(res.data)
    })
  },[])

  return (
    <div>App
      <ul>
        <li>111111111</li>
        <li>111111111</li>
      </ul>
      <Child />
    </div>
  );
}

export default App;
