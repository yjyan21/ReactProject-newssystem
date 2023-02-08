import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'
import './NewsSandBox.css'

import { Layout } from 'antd';
const { Content } = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>  
			<Layout className="site-layout">
				<TopHeader style={{backgroundColor:'white'}}>top</TopHeader> 
				<Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
						backgroundColor:'white',
            //background: colorBgContainer,
          }}
        >
						Content
					<Switch>
						<Route path="/home" component={Home} />
						<Route path="/user-manager/list" component={UserList} />
						<Route path="/right-manager/role/list" component={RoleList} />
						<Route path="/right-manager/right/list" component={RightList} />

						<Redirect from="/" to="home" exact />
						<Route path="*" component={NoPermission} />
					</Switch>
				</Content>
			</Layout>
    </Layout>
  )
}
