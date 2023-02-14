import React, {useState, useEffect} from 'react'
import {Table, Button, Modal, Tree } from 'antd'
import {DeleteOutlined, UnorderedListOutlined,
  ExclamationCircleFilled} from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
  const [currentRights, setcurrentRights] = useState([])
  const [currentId, setcurrenId] = useState(0)

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
                setcurrentRights(item.rights)
                setcurrenId(item.id)
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

  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
      //console.log(res.data)
      setRightList(res.data)
    })
      
  },[])

  const handleOk = () => {
    setisModalOpen(false)
    setDataSource(dataSource.map(item=>{
      if(item.id===currentId){
        return{
          ...item,
          rights:currentRights
        }
      }
      return item
    }))
    axios.patch(`http://localhost:5000/roles/${currentId}`,{rights:currentRights})
  }
  const handleCancel = () => {
    setisModalOpen(false)
  }
  const onCheck = (checkKeys) => {
    setcurrentRights(checkKeys.checked)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
       rowKey={item=>item.id}></Table>
       <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <Tree 
          checkable 
          checkedKeys={currentRights}
          onCheck={onCheck} 
          checkStrictly={true}
          treeData={rightList} 
        />

      </Modal>
    </div>
  )
}
