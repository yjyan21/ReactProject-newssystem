import React,{useEffect, useState} from 'react'
import Home from '../../views/sandbox/home/Home'
import UserList from '../../views/sandbox/user-manage/UserList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import RightList from '../../views/sandbox/right-manage/RightList'
import NoPermission from '../../views/sandbox/nopermission/NoPermission'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import Published from '../../views/sandbox/publish-manage/Published'
import Sunset from '../../views/sandbox/publish-manage/Sunset'
import axios from 'axios'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
import NewsUpdate from '../../views/sandbox/news-manage/NewsUpdate'
import {Spin} from 'antd'
import { connect } from 'react-redux'

const localRouterMap = {
	"/home":Home,
	"/user-manage/list":UserList,
	"/right-manage/role/list":RoleList,
	"/right-manage/right/list":RightList,
	"/news-manage/add": NewsAdd,
	"/news-manage/draft": NewsDraft,
	"/news-manage/category":NewsCategory,
	"/news-manage/preview/:id":NewsPreview,
	"/news-manage/update/:id":NewsUpdate,
    "/audit-manage/audit":Audit,
	"/audit-manage/list":AuditList,
	"/publish-manage/unpublished":Unpublished,
	"/publish-manage/published":Published,
	"/publish-manage/sunset":Sunset
}

function NewsRouter(props) {
	const [BackRouteList,setBackRouteList] = useState([])
	useEffect(()=>{
		Promise.all([
			axios.get("http://localhost:5000/rights"),
			axios.get("http://localhost:5000/children"),]).then(res=>{
				setBackRouteList([...res[0].data,...res[1].data]) 
				//注意，上面是data,单词别写错
			})
	},[])

	const {role:{rights}} = JSON.parse(localStorage.getItem("token"))
	const checkRoute = (item) => {
		//console.log(item.key)
		//console.log(localRouterMap["/home"])
		return (localRouterMap[item.key] && (item.pagepermisson || item.routepermisson)) 
	}
	const checkUserPermission = (item) => {
		return rights.includes(item.key)
	}
  return (
    <div>
	 <Spin size='large' spinning={props.isLoading}>
      <Switch>
				{/* <Route path="/home" component={Home} />
				<Route path="/user-manage/list" component={UserList} />
				<Route path="/right-manage/role/list" component={RoleList} />
				<Route path="/right-manage/right/list" component={RightList} /> */}

				{
					BackRouteList.map(item=>{
						if(checkRoute(item) && checkUserPermission(item)){
							
							return	(
								<Route path={item.key} key={item.key} component={localRouterMap[item.key]} 
								exact />
						)}else{
							// return <NoPermission />
							return null
						}
					})
				}

				<Redirect from="/" to="/home" exact />
				{/* <Route path="*" component={NoPermission} /> */}
				{ BackRouteList.length>0 && <Route path="*" component={NoPermission} />}
				{/* 上面这么写就不会因为数据还没加载上来而显示403了； */}
	  </Switch>
	 </Spin>
    </div>
  )
}
const mapStateToProps = ({LoadingReducer:{isLoading}}) => {
	return {
	  isLoading
	}
  }
export default connect(mapStateToProps)(NewsRouter)