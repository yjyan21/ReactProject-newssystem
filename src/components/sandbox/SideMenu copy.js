import React, {useState} from 'react'
import './index.css'
//时间02/06/2023,因为想要跟老师写的一致，所以备份这个，然后写一份跟老师视频中一样的，这个文件
//我自己写的就留着了；
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileOutlined, PieChartOutlined, DesktopOutlined, TeamOutlined, HomeOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('User Manage', 'sub1', <UserOutlined />, [
    getItem('User List', '3'),
  ]),
  getItem('limits of authority', 'sub2', <TeamOutlined />, 
  [getItem('Role List', '6'), getItem('Right lis', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="logo">News Publish System</div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>

    // <Sider trigger={null} collapsible collapsed={false} >
    //     <div className="logo">News Publish System</div>
    //     <Menu
    //       theme="light"
    //       mode="inline"
    //       defaultSelectedKeys={['1']}
    //       items={[
    //         {
    //           key: '1',
    //           icon: <UserOutlined />,
    //           label: 'nav 1',
    //         },
    //         {
    //           key: '2',
    //           icon: <VideoCameraOutlined />,
    //           label: 'nav 2',
    //         },
    //         {
    //           key: '3',
    //           icon: <UploadOutlined />,
    //           label: 'nav 3',
    //         },
    //       ]}
    //     />
    //   </Sider>
  )
}
