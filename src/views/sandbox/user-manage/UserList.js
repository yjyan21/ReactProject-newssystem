import React, {useState, useEffect, useRef, userFormRef} from 'react'
import {Table, Button, Modal, Switch, Form } from 'antd'
import UserForm from '../../../components/user-manage/UserForm'
import {DeleteOutlined, EditOutlined, 
  ExclamationCircleFilled, } from '@ant-design/icons'

import axios from 'axios'

const { confirm } = Modal;


export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [roleList, setroleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [isUpdateOpen, setisUpdateOpen] = useState(false)
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
  const [current, setCurrent] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then
      (res => {

        setDataSource(res.data)
      })
  })
  useEffect(() => {
    axios.get("http://localhost:5000/regions").then
      (res => {

        setRegionList(res.data)
      })
  })
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then
      (res => {

        setroleList(res.data)
      })
  })

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item=>({
          text:item.title,
          value:item.value })),
          {
            text:"全球",
            value:"全球"
          }
      ],
      onFilter:(value,item )=>{
        if(value==="全球"){
          return item.region===""
        }else{
         return item.region===value
        }
      },
        
      render:(region)=>{
        return <b>{region===""?"全球":region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render:(role)=>{
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(roleState,item)=>{
        return <Switch checked={roleState} disabled={item.default}
        onChange={()=>handleChange(item)}></Switch>
        //上面别忘了return关键字
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default}
            onClick={()=>{ //这里的形参括号里面不能写item,否则传下去的参数就不一样了
              confirmMethod(item);
            }}/>
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} 
              onClick={()=>{handleUpdate(item)}}/>
            
          </div>)
        }
    },
  ];

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
    setDataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`)

  }
  const addFormOk = () => {
    addForm.current.validateFields().then(value=>{
      //console.log(value)
      setIsAddOpen(false)
      addForm.current.resetFields() //表单内容重置
      //post到后端，生成id，再设置 datasource，方便后面的删除和更新
      axios.post(`http://localhost:5000/users`,{
        ...value,
        "roleState": true,
        "default": false
        }).then(res=>{
          console.log(res .data)
          setDataSource([...dataSource, {
            ...res.data,
            role:roleList.filter(item=>
              item.id===value.roleId)[0]
          }])
        }).catch(err=>{
            //console.log(err)//注释了这句，后台依然一直上千条的报错
        })
     })
   }

   const handleChange = item => {
     //console.log(item)
     item.roleState = !item.roleState
     setDataSource([...dataSource])
     axios.patch(`http://localhost:5000/users/${item.id}`,{
      roleState:item.roleState })
   }

   const handleUpdate = item => {
     setTimeout(()=>{
      setisUpdateOpen(true)
      if(item.roleId===1){
        setisUpdateDisabled(true)
      }else{
        setisUpdateDisabled(false)
      }
      updateForm.current.setFieldsValue(item)
     },0)
      setCurrent(item)

    //  (async ()=>{  await setisUpdateOpen(true);
    //   userFormRef.current.setFieldsValue(item);})(); //弹幕里找的这句
    //本来按照上面的写法，我这里点击出来的form表单并不会自动填上信息，下午不行，晚上试了试
    //又行了......其实也不全是，看我Note里面写的吧

   }

   const updateFormOk = () => {
    
    updateForm.current.validateFields().then(value =>{
      setisUpdateOpen(false)
      setDataSource(dataSource.map(item=>{
        if(item.id===current.id){
          return{
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
        }
        return item
      }))
      setisUpdateDisabled(!isUpdateDisabled)
      axios.patch(`http://localhost:5000/users/${current.id}`,
      value)
    })
   }

  return (
    <div>
      <Button type="primary" onClick={()=>{
        setIsAddOpen(true)
      }}>Add User</Button>
      <Table dataSource={dataSource} columns={columns} 
       pagination={{
        pageSize:5
       }}
       rowKey={(item)=>item.id}
       />

    <Modal
      open={isAddOpen}
      title="Add User Profile"
      okText="Submit"
      cancelText="Cancel"
      onCancel={()=>{
        setIsAddOpen(false)
      }}
      onOk={()=>addFormOk() }
    >
        <UserForm roleList={roleList} regionList={regionList}
          ref={addForm}></UserForm>
    </Modal>

    <Modal
      open={isUpdateOpen}
      title="Update User Profile"
      okText="Submit"
      cancelText="Cancel"
      onCancel={()=>{
        setisUpdateOpen(false)
        setisUpdateDisabled(!isUpdateDisabled)
      }}
      onOk={()=>updateFormOk() }
    >
        <UserForm roleList={roleList} regionList={regionList}
          ref={updateForm} isUpdateDisabled={isUpdateDisabled}></UserForm>
    </Modal>

    </div>
  )
}
