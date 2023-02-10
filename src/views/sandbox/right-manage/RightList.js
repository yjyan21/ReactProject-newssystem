import React, {useState, useEffect} from 'react'
import {Table, Tag, Button} from 'antd'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import axios from 'axios'

export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/rights").then(res=>
    setDataSource(res.data))
  })
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render:()=>{
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} />
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </div>)
        }
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
