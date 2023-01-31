import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout; //import语句都写完了，才能写const语句；

export default function TopHeader() {
  const[collapsed,setCollapsed] = useState(false)
  return (
    <div>
      <Header
          style={{
            padding: 0,
            // background: colorBgContainer,
          }}
        >
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
          {
            collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
        </Header>
    </div>
  )
}
