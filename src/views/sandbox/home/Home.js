import React,{useEffect, useState} from 'react'
import { Card, Col, Row, List, Avatar} from 'antd';
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons'
import axios from 'axios'

const {Meta} = Card

export default function Home() {

  const [viewList,setViewList] = useState([])
  const [starList,setStarList] = useState([])

  useEffect(()=>{
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res=>{
      //console.log(res.data)
      setViewList(res.data)
     })
    },[])
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res => {
      //console.log(res.data)
      setStarList(res.data)
    })
  }, [])

  const {username,region,role:{roleName}} = JSON.parse(localStorage.getItem("token"))
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户最多点赞" bordered={true}>
            <List
                size="small"
                dataSource={starList}
                renderItem={(item) => <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
              />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            cover={
              <img  alt="examp1e"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            }
          
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="e11ipsis" />,
          ]}
          >
          <Meta
              avatar={<Avatar  />}
              title={username}
              description={
                <div><b>{region?region:"全球"}</b>--<span>{roleName}</span></div>
              }
          />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
