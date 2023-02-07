import React from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  HomeOutlined,
  PartitionOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
//模拟数组结构
const menuList = [
  {
    key:"/home",
    title:"Home",
    icon:<HomeOutlined />,
  },
  {
   key:"/user-manage",
   title:"User Manage",
   icon:<UserOutlined />,
   childrenMenu:[
    {
    key:"/user-manage/list",
    title:"User List",
    icon:<UserOutlined />,
    }
   ]
  },

  {
    key:"/right-manage",
    title:"Right Manage",
    icon:<PartitionOutlined />,
    childrenMenu:[
     {
     key:"/right-manage/role/list",
     title:"Role List",
     icon:<UserOutlined />,
     },
     {
      key:"/right-manage/right/list",
      title:"Right List",
      icon:<UserOutlined />,
      }
    ]
   }
]

export default function SideMenu(props) {
//现在SideMenu可以直接收到props,
//然后const navigate=useNavigate( ) ,Menu里onClick={ props => navigate(props.key) }
//<Link to="foo">to foo</Link>;
 // const navigate = useNavigate();
  const renderMenu = (menuList) => 
  {
    return (menuList.map(item=>{
      if(item.childrenMenu){
        return <SubMenu key={item.key} icon={item.icon} title={item.title} >
          { 
            item.childrenMenu.map(item=>{
              return <Menu.Item key={item.key} icon={item.icon} onClick={()=>{
                //navigate(item.key)
                //console.log(item.key)
                //props.history.push(item.key)
              }}><Link to={item.key}>{item.title}</Link></Menu.Item>
            })
          }
        </SubMenu>
      //上面别忘了return
      }else{
        return <Menu.Item key={item.key} icon={item.icon} onClick={()=>{
          // navigate(item.key)
           //console.log(item.key)
          //props.history.push(item.key)
        }}><Link to={item.key}>{item.title}</Link></Menu.Item>
      }
    }))
  }
  return (
        <Sider trigger={null} collapsible collapsed={false}>
          <div className="logo">News Publish System</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
         {/* 
          
          
              <Menu.Item key="1" icon={menuList[0].icon}>
              nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
              </Menu.Item>
              <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                <Menu.Item key="g">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
             */}

             {renderMenu(menuList)}
            </Menu>
        </Sider>
  )
}
//export default withRouter(SideMenu)
