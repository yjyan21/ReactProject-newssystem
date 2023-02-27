import React,{useEffect, useState} from 'react'
import { Card, Col, Row, List, Avatar} from 'antd';
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons'
import axios from 'axios'

const {Meta} = Card

export default function Home() {

  const [viewList,setViewList] = useState([])

  useEffect(()=>{
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res=>{
      //console.log(res.data)
      setViewList(res.data)
     })
    },[])

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => <List.Item>{item.title}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={true}>
            <List
                size="small"
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
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
              title="card title"
              description="This is the description"
          />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
