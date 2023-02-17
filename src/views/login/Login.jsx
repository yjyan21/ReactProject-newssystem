import React from 'react'
import axios from 'axios'
import {Form, Button, Input, message} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import  './login.css'

export default function Login(props) {

  const onFinish= values=>{
    console.log(values.username)
    console.log(values.password)
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
      console.log(res.data)
      if(res.data.length===0){
        message.error("User name or password is not correct.")
        console.log("不匹配")
      }else{
        localStorage.setItem("token",JSON.stringify(res.data[0]))
        props.history.push("/")
        console.log("匹配")
      }
    })
  }


  return (
    <div style={{background:'rgb(35,39,65)',height:'100%',}}>
      
      <div className='formContainer'>
        <div className='loginTile'>News Publish System</div>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}
