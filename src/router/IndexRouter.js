import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <div>
     	<Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<NewsSandBox/>}/>
        </Routes>
    </Router> 
    </div>
  )
}
