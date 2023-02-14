import React, {useState, useEffect} from 'react'
import {Table, Button, Modal, Switch, Form, Input, Select} from 'antd'
import {DeleteOutlined, EditOutlined, 
  ExclamationCircleFilled, } from '@ant-design/icons'

import axios from 'axios'

const { confirm } = Modal;
const {Option} = Select;

export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [roleList, setroleList] = useState([])
  const [regionList, setRegionList] = useState([])

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
        return <Switch checked={roleState} disabled={item.default}></Switch>
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
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} />
            
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
      onOk={() => {
        // form
        //   .validateFields()
        //   .then((values) => {
        //     form.resetFields();
        //     onCreate(values);
        //   })
        //   .catch((info) => {
        //     console.log('Validate Failed:', info);
        //   });
      }}
    >
        <Form
          layout="vertical" //这句用来控制lable文字和输入框是否左右水平排列；

        >
          <Form.Item
            name="username"
            label="UserName"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="region"
            label="Region"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Select>
              {regionList.map((item)=>{
                return <Option value={item.value} key={item.id}>{item.value}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="Role"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Select>
              {roleList.map((item)=>{
                return <Option value={item.id} key={item.id}>{item.roleName}</Option>
              })}
            </Select>
          </Form.Item>
          
        
      </Form>
    </Modal>

    </div>
  )
}
