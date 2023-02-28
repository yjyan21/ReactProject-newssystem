import React,{useEffect, useState, useRef} from 'react'
import { Card, Col, Row, List, Avatar, Drawer} from 'antd';
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons'
import * as Echarts from 'echarts'
import _ from 'lodash'
import axios from 'axios'

const {Meta} = Card

export default function Home() {

  const [viewList,setViewList] = useState([])
  const [starList,setStarList] = useState([])
  const [allList,setAllList] = useState([])
  const [visible,setVisible] = useState(false)
  const [barChart,setBarChart] = useState(null)
  const [pieChart,setPieChart] = useState(null)
  const barRef = useRef()
  const pieRef = useRef()

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
  useEffect(()=>{

    axios.get("/news?publishState=2&_expand=category").then(res=>{
      //console.log(res.data)
      renderBarView(_.groupBy(res.data,item=>item.category.title))
      setAllList(res.data)
    })
    return ()=> {
      window.onresize = null
    }

  },[])

    const renderBarView = (obj) =>{
      // Initialize the echarts instance based on the prepared dom
    //var myChart = Echarts.init(barRef.current);

    var myChart;
    if(!myChart){
      myChart = Echarts.init(barRef.current);
      setBarChart(myChart)
    }else{
      myChart = barChart
    }

          // Specify the configuration items and data for the chart
    var option = {
      title: {
        text: 'News Categories Chart'
      },
      tooltip: {},
      legend: {
        data: ['Number']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel:{
          rotate:"45",
          interval:0
        }
      },
      yAxis: {minInterval:1},
      series: [
        {
          name: 'Number',
          type: 'bar',
          data: Object.values(obj).map(item=>item.length)
        }
      ]
    };
    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
    window.onresize = () => {
      myChart.resize()
    }
    // if(myChart != null && myChart != ""&& myChart != undefined){
    //   myChart.dispose();
    // }
    }

  const renderPieView = (obj) => {
    var currentList = allList.filter(item=>item.author===username)
    var groupObj = _.groupBy(currentList,item=>item.category.title)
    var list = []
    for(var i in groupObj){
      list.push({
        name:i,
        value:groupObj[i].length
      })
    }
    //console.log(list)

    //if(myChart){myChart.dispose();} //写了这句依然报warning
    var myChart;
    
    if(!myChart){
      myChart = Echarts.init(pieRef.current);
      setPieChart(myChart)
    }else{
      myChart = pieChart
    }
    var option;

    option = {
      title: {
        text: '当前用户新闻分类图示',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Number of Published News',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
    
  }

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
            <SettingOutlined key="setting" 
              onClick={()=>{
                setVisible(true) //原处这句是放在setTimeout里面，结果我这里还是有bug，弹幕中是放到外面就行
                                 //
                setTimeout(()=>{
                  renderPieView()
                },0)
              }} />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
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

      <Drawer width='500px'
        title="个人新闻分类" 
        placement="right" 
        onClose={()=>setVisible(false)} 
        open={visible}
        >
        <div ref={pieRef} 
          style={{ width: '100%', height: '400px', paddingTop: '30px' }}>

        </div>
      </Drawer>

      <div ref={barRef} 
        style={{width:'100%',height:'400px',paddingTop:'30px'}}>

      </div>

    </div>
  )
}
