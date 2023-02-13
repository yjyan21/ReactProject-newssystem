import React, {useState, useEffect} from 'react'
import {Table, Button, Modal } from 'antd'
import {DeleteOutlined, UnorderedListOutlined,
  ExclamationCircleFilled} from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '权限分配',
      render:(item)=>{
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} 
              onClick={()=>
                confirmMethod(item)}/>
            <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} 
              onClick={()=>{
                setisModalOpen(true)
              }}/>
            
            
          </div>)
        }
    },
  ]

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
    axios.delete(`http://localhost:5000/roles/${item.id}`)
  }

  useEffect(()=>{
    axios.get("http://localhost:5000/roles").then(res=>{
      //console.log(res.data)
      setDataSource(res.data)
    })
      
  },[])

  const handleOk = () => {

  }
  const handleCancel = () => {
    setisModalOpen(false)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
       rowKey={item=>item.id}></Table>
       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
