import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>  
			<TopHeader></TopHeader> 
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/user-manager/list" component={UserList} />
				<Route path="/right-manager/role/list" component={RoleList} />
				<Route path="/right-manager/right/list" component={RightList} />

				<Redirect from="/" to="Home" exact />
				<Route path="*" component={NoPermission} />
			</Switch>
    </div>
  )
}
