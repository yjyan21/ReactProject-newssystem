import React,{useState, useEffect, useRef} from 'react'
import {PageHeader} from '@ant-design/pro-layout'
import { Steps, Button, Form, Input, Select, message, notification } from 'antd';
import style from './News.module.css'
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor';
const {Option} = Select

export default function NewsAdd(props) {
  //const description = 'This is a description.';
  
  const [current, setCurrent] = useState(0)
  const [categoryList,setCategoryList] = useState([])

  const [formInfo, setFormInfo] = useState({})
  const [content, setContent] = useState("")

  const User = JSON.parse(localStorage.getItem("token"))
  const handlePrevious = () => {
    setCurrent(current-1)
  }
  const handleNext = () => {
    if(current===0){
      NewsForm.current.validateFields().then(res=>{
        //console.log(res)
        setFormInfo(res)
        setCurrent(current+1)
      }).catch(error=>
        console.log(error))
    }else{
      if(content == "" || content.trim()=="<p></p>"){
        message.error("Please input something.")
      }else{
        //console.log(formInfo, content)
         setCurrent(current+1)
      }
    }
    
  }
  const NewsForm = useRef(null)
  useEffect(()=>{
    axios.get("/categories").then(res=>{ //因为之前封装过路径，所以get后面只需要写categories
      setCategoryList(res.data)
      //console.log(categoryList)
    }
      )
  })

  
  const handleSave = (auditState) => {
    axios.post('/news',{
      ...formInfo,
      "content": content,
      "region": User.region?User.region:"全球",
      "author":User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishstate":0,
      "createTime": Date.now(),
      "star":0,
      "view":0
      // "publishTime":0
    }).then(res=>{
      props.history.push(auditState===0?"/news-manage/draft":"/audit-manage/list")
      notification.info({
        message:`Alert`, //为什么不是单引号？
        description:
        `You could go to ${auditState===0?'[Draft Box]':'[Audit List]' } to check you News content`,
        placement:"bottomRight",
    })
  })
      
  }
  

  return (
    <div>
      <PageHeader
        className="site-page-header" 
        title="Write News"
        subTitle="This is a subtitle" 
        />
      <Steps
        current={current}
        items={[
          {
            title: 'Basic Information',
            description: 'Title, Category',
          },
          {
            title: 'News Content',
            description: 'News topic content',
            // subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting audit',
            description: 'Draft or waiting audit',
          },
        ]}
      />
      
      <div style={{marginTop:'25px'}}>
      <div className={current===0?'':style.active}>
        <Form
          name="basic"
          ref={NewsForm}
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 21,
          }}
          style={{
            maxWidth: '600px', //原来这里写的600px
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Select>
              {
                categoryList.map(item=>{
                 return <Option value={item.id} key={item.id}>{item.title}</Option>
                 //别忘了写return
                })
              }
            </Select>
          </Form.Item>

        </Form>
      </div>
      <div className={current===1?'':style.active}>
        <NewsEditor getContent={(value)=>{
         //console.log(value)
         setContent(value)
        }}></NewsEditor>
      </div>
      <div className={current===2?'':style.active}>
        {/* <input type="text"/> */}
      </div>
      </div>

      <div style={{marginTop:'25px'}}>
        {
          current>0 && <span>
            <Button type="primary" onClick={()=>handlePrevious()}>上一步</Button>
            </span>
        }
        {
          current === 2 && <span>
            <Button type="primary" onClick={()=>handleSave(0)}>Save Draft</Button>
            <Button danger  onClick={()=>handleSave(1)}>Submit to Audit</Button>
            </span>
        }
        {
          current<2 && <Button type="primary" onClick={()=>handleNext()}>下一步</Button>
        }
        
      </div>
    </div>
  )
}
