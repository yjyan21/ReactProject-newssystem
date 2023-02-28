import React,{useEffect,useState} from 'react'
import { PageHeader } from '@ant-design/pro-layout';
import {Card, Col, Row, List} from 'antd'
import _ from 'lodash'
import axios from 'axios'

export default function News() {
		const [list,setList] = useState([])
    useEffect(()=>{
      axios.get("/news?publishState=2&_expand=category").then(res=>{
				console.log(Object.entries(_.groupBy(res.data,item=>item.category.title)))
				setList(Object.entries(_.groupBy(res.data,item=>item.category.title)))
			}) 
    },[])
  return (
    <div style={{width:'95%',margin:'0 auto'}}>
			<PageHeader
				className="site-page-header"
				title="All News"
				subTitle="Check every news"
				>
			</PageHeader>

			<Row gutter={[16,16]}>
				{
					list.map(item=>{
						return(
							<Col span={8} key={item[0]} >
								<Card title={item[0]} bordered={false} hoverable={true}>
									<List
										size="small"
										dataSource={item[1]}
										pagination={{ pageSize: 3 }}
										renderItem={(data) => <List.Item><a href={`#/detail/${data.id}`}>{data.title}</a></List.Item>}
									/>
								</Card>
							</Col>
						)
					})
				}

			</Row>
		</div>
  )
}
