import React, { useState } from 'react'
import { Layout, Avatar, Dropdown, Space, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
const { Header } = Layout; //import语句都写完了，才能写const语句；

function TopHeader(props) {
  const[collapsed,setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))

  const menu = (
    <Menu>
      <Menu.Item>
        {roleName}
      </Menu.Item>
      <Menu.Item danger onClick={()=>{
        localStorage.removeItem('token')
        props.history.replace("/login")
      }}>
        退出
      </Menu.Item>
    </Menu>
  )
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          {roleName}
        </a>
      ),
    },
   
    {
      key: '4',
      danger: true,
      label: 'Sign out',
      onClick:()=>{
        //console.log('qqq')
        localStorage.removeItem('token')
        props.history.replace("/login")
      }
    },
  ];
  return (
    <div>
      <Header
          style={{
            padding: '0px 16px',
            // background: colorBgContainer,
          }}
        >
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
          {
            collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined 
            onClick={changeCollapsed}/>
          }
          
          <span style={{float:'right'}}>
           {/*  */}
           <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                  {/* <DownOutlined /> 小图标右边的向下的箭头图标*/}
                </Space>
              </a>
          </Dropdown>
          </span>
          <span style={{float:'right',paddingRight:'5px'}}>
            Welcome back!  <span style={{color:'blue'}}>{username} </span> 
          </span>
        </Header>
        
    </div>
  )
}
export default withRouter(TopHeader)