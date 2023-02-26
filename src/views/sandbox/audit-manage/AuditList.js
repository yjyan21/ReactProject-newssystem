import React,{useEffect,useState} from 'react'
import {Table, Tag, Button, notification} from 'antd'
import axios from 'axios'

export default function AuditList(props) {
//主要是从RightList.js复制
const [dataSource, setDataSource] = useState([])

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
    title: 'Audit Status',
    dataIndex: 'auditState',
    render:(auditState)=>{
      const colorList = ["","orange","green","red"]
      const auditList = ["草稿箱","审核中","已通过","未通过"]
      return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
    }
  },
  {
    title: 'Operate',
    render:(item)=>{
      return (
        <div>
          {item.auditState === 1 && <Button onClick={()=>handleReverse(item)}>Cancel</Button>}
          {item.auditState === 2 && <Button danger onClick={()=>handlePublish(item)}>Publish</Button>}
          {item.auditState === 3 && <Button type="primary" onClick={()=>handleUpdate(item)}>Update</Button>}
        </div>)
      }
  },
];

  const {username} = JSON.parse(localStorage.getItem("token"))
  //console.log(localStorage.getItem("token"))

  useEffect(()=>{
    axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1
      &_expand=category`).then(res=>{
       // console.log(res.data)
        setDataSource(res.data)
      })
  },[username])

  const handleReverse = item => {
    setDataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/news/${item.id}`,{
      auditState:0
    }).then(res=>{
      notification.info({
        message:`Alert`, //为什么不是单引号？
        description:
        `You could go to [Draft Box] to check you News content`,
        placement:"bottomRight",
    })
    })
  }

  const handleUpdate = item => {
    props.history.push(`/news-manage/update/${item.id}`)
  }

  const handlePublish = item => {
    axios.patch(`/news/${item.id}`,{
      "publishState": 2,
      "publishTime": Date.now()
    }).then(res=>{
      props.history.push("/publish-manage/published")
      notification.info({
        message:`Alert`, //为什么不是单引号？
        description:
        `You could go to [Publish manage / Published] to check you News content`,
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
