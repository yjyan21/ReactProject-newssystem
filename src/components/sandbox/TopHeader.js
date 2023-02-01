import React, { useState } from 'react'
import { Layout, Avatar, Dropdown, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  SmileOutlined
} from '@ant-design/icons';
const { Header } = Layout; //import语句都写完了，才能写const语句；

export default function TopHeader() {
  const[collapsed,setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Admin
        </a>
      ),
    },
   
    {
      key: '4',
      danger: true,
      label: 'Sign out',
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
            Welcome back! admin  
          </span>
        </Header>
        
    </div>
  )
}
