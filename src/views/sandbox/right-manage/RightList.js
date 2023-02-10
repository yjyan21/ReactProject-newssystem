import React, {useState, useEffect} from 'react'
import {Table} from 'antd'
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
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
