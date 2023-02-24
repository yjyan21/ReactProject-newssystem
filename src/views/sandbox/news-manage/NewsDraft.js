import React, {useState, useEffect} from 'react'
import {Table, Button, Modal, notification} from 'antd'
import {DeleteOutlined, EditOutlined, 
  ExclamationCircleFilled, UploadOutlined} from '@ant-design/icons'

import axios from 'axios'

const { confirm } = Modal;

export default function NewsDraft(props) {
  const [dataSource, setDataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem("token"))

  //news?author=${username}&auditState=0&_expand=category

  useEffect(()=>{
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then
    (res=> {
      setDataSource(res.data)
    })
},[username])//这里确定不需要加一个依赖的数组吗？
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: 'News Title',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: 'News Author',
      dataIndex: 'author',
    },
    {
      title: 'News Category',
      dataIndex: 'category',
      render:(category)=>{
        return category.title
      }
    },
    {
      title: 'Manage',//操作
      render:(item)=>{
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} 
            onClick={()=>{ //这里的形参括号里面不能写item,否则传下去的参数就不一样了
              confirmMethod(item);
            }}/>
            
            <Button shape="circle" icon={<EditOutlined />} 
              onClick={()=>{
                props.history.push(`/news-manage/update/${item.id}`)
              }}
            />
            <Button type="primary" shape="circle" icon={<UploadOutlined />} 
              onClick={()=>{handleCheck(item.id)}}/>
            
          </div>)
        }
    },
  ];
 
  const handleCheck = (id) => {
    axios.patch(`/news/${id}`,{
      auditState:1
    }).then(res=>{
      props.history.push("/audit-manage/list")
      notification.info({
        message:`Alert`, //为什么不是单引号？
        description:
        `You could go to [Audit List] to check you News content`,
        placement:"bottomRight",
    })
  })
  }

  const confirmMethod = (item) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item);
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };
  const deleteMethod = (item) => {
    //console.log(item)
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`/news/${item.id}`)
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
