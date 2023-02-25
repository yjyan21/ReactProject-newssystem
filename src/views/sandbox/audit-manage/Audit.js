import React,{useState, useEffect} from 'react'
import {Table, Button, notification} from 'antd'
import axios from 'axios'

export default function Audit() {

  const [dataSource, setDataSource] = useState([])
  const {roleId,region,username} = JSON.parse(localStorage.getItem("token"))
  const columns = [
    {
      title: 'News Topic',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'News Category',
      dataIndex: 'category',
      render:(category)=>{
        return <div>{category.title}</div>
      }
    },
    {
      title: 'Operate',
      render:(item)=>{
        return (
          <div>
            <Button type="primary" onClick={()=>handleAudit(item,2,1)}>Pass</Button>
            <Button danger onClick={()=>handleAudit(item,3,0)}>Reject</Button>
          </div>)
        }
    },
  ];
  useEffect(()=>{
    const roleObj = {
      "1":"superadmin",
      "2":"admin",
      "3":"editor"
    }
    axios.get(`/news?auditState=1&_expand=category`).then(res => {
        const list = res.data
        setDataSource(roleObj[roleId]==="superadmin"?list:[
          ...list.filter(item=>item.author===username),
          ...list.filter(item=>item.region===region&&roleObj[item.roleId]==="editor")
        ])
      })
  },[roleId,username,region])

  const handleAudit = (item,auditState,publishState) => {
    setDataSource(dataSource.filter(date=>date.id!==item.id))
    axios.patch(`/news/${item.id}`,{
      auditState,
      publishState,
    }).then(res=>{
      notification.info({
        message:`Alert`, //为什么不是单引号？
        description:
        `You could go to [Audit Manage / Audit List] } to check the status of you News`,
        placement:"bottomRight",
    })
    })
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} 
       pagination={{
        pageSize:5
       }}
       rowKey={item=>item.id}
       />
    </div>
  )
}
