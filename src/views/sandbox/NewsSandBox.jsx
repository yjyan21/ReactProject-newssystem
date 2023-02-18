import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewsRouter from '../../components/sandbox/NewsRouter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './NewsSandBox.css'

import { Layout } from 'antd';
import { useEffect } from 'react'

const { Content } = Layout;

export default function NewsSandBox() {
	NProgress.start()
	useEffect(()=>{
		NProgress.done()
	})
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
						
						overflow:'auto'
            //background: colorBgContainer,
          }}
        >
				<NewsRouter></NewsRouter>	
					
				</Content>
			</Layout>
    </Layout>
  )
}
