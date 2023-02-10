import React, {useEffect, useState} from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { Link, useHistory } from 'react-router-dom';
import {
  UserOutlined,
  HomeOutlined,
  PartitionOutlined,
  TeamOutlined,
  ContainerOutlined,
  MonitorOutlined,
  ProfileOutlined,
  DeliveredProcedureOutlined,
  FileExclamationOutlined,
  FileOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import axios from 'axios'

const { Sider } = Layout;
const { SubMenu } = Menu;
//模拟数组结构
/*const menuList = [
  {
    key:"/home",
    title:"Home",
    icon:<HomeOutlined />,
  },
  {
   key:"/user-manage",
   title:"User Manage",
   icon:<UserOutlined />,
   children:[
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
    children:[
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
] */
const iconList = {
  "/home":<HomeOutlined />,
  "/user-manage":<TeamOutlined />,
  "/user-manage/list":<UserOutlined />,
  "/right-manage":<PartitionOutlined />,
  "/right-manage/role/list":<UserOutlined />,
  "/right-manage/right/list":<UserOutlined />,
  "/news-manage":<ContainerOutlined />,
  "/news-manage/list":<PartitionOutlined />,
  "/news-manage/add":<PartitionOutlined />,
  "/news-manage/update/:id":<PartitionOutlined />,
  "/news-manage/preview/:id":<PartitionOutlined />,
  "/news-manage/draft":<PartitionOutlined />,
  "/news-manage/category":<PartitionOutlined />,
  "/audit-manage":<MonitorOutlined />,
  "/audit-manage/audit":<PartitionOutlined />,
  "/audit-manage/list":<ProfileOutlined />,
  "/publish-manage":<DeliveredProcedureOutlined />,
  "/publish-manage/unpublished":<FileExclamationOutlined />,
  "/publish-manage/published":<FileOutlined />,
  "/publish-manage/sunset":<FileExcelOutlined />


}

export default function SideMenu(props) {
   
   
   const [menu, setMenu] = useState([])
//现在SideMenu可以直接收到props,
//然后const navigate=useNavigate( ) ,Menu里onClick={ props => navigate(props.key) }
//<Link to="foo">to foo</Link>;
 // const navigate = useNavigate();
  
  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
      //console.log(res.data)
      setMenu(res.data)
    })
  },[])
  const checkPagePermission = (item) => {
    return item.pagepermisson === 1
  }
  const renderMenu = (menuList) => 
  {
    return (menuList.map(item=>{
      if(item.children?.length>0 && checkPagePermission(item)){
        //checkPagePermission后面别忘了加小括号
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title} >
          { 
            // item.children.map(item=>{
            //   return (
            //     <Menu.Item key={item.key} icon={item.icon} >
            //      <Link to={item.key}>{item.title}</Link>
            //     </Menu.Item>
            //   )
               
            // })
            //原来是上面的写法，结果接入db.json文件且设置了checkPagePermission()函数之后，页面显示效果没变，
            //依然是所有的二级目录都显示出来，
            renderMenu(item.children)
          }
        </SubMenu>
      //上面别忘了return
      }else{
        return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={()=>{
          //checkPagePermission后面别忘了加小括号
          // navigate(item.key)
           //console.log(item.key)
          //props.history.push(item.key)
        }}><Link to={item.key}>{item.title}</Link></Menu.Item>
      }
    }))
  }
  let history = useHistory()
  //console.log(history.location.pathname)
  const slectKeys = [history.location.pathname]
  
  const slectKeysNow = "'" + slectKeys[0] + "'"
  //console.log(slectKeys[0])
  const openKeys = ["/"+history.location.pathname.split("/")[1]]
  return (
        <Sider trigger={null} collapsible collapsed={false}>
          <div style={{display:'flex',height:'100%',flexDirection:'column'}}>
            <div className="logo">News Publish System</div>
            <div style={{flex:1,overflow:'auto'}}>
              <Menu theme="dark" mode="inline" selectedKeys={slectKeys} 
              defaultOpenKeys={openKeys}>
               {/* {console.log(slectKeys)}  */}
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

                {/* {renderMenu(menuList)} */}
                {renderMenu(menu)}
              </Menu>
            </div>
          </div>
        </Sider>
  )
}
//export default withRouter(SideMenu)
