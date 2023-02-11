import React, {useState, useEffect} from 'react'
import {Table, Tag, Button, Modal, Popover, Switch} from 'antd'
import {DeleteOutlined, EditOutlined, 
  ExclamationCircleFilled, } from '@ant-design/icons'

import axios from 'axios'

const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then
    (res=> {
      let datalist = res.data
      datalist.forEach(item=>{
        if(item.children.length===0){
          item.children = ""
        }
      })
      setDataSource(res.data)
    })
})
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} 
            onClick={()=>{ //这里的形参括号里面不能写item,否则传下去的参数就不一样了
              confirmMethod(item);
            }}/>
            <Popover content={<div style={{textAlign:'center'}}>
              <Switch defaultChecked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
            </div>} title="配置项" trigger={item.pagepermisson===1||item.pagepermisson!==undefined?
            "click":""}>
              <Button type="primary" shape="circle" icon={<EditOutlined />} 
              disabled={item.pagepermisson===1||item.pagepermisson!==undefined?false:true} />
            </Popover>
            
          </div>)
        }
    },
  ];
  /* const switchMethod = (item) => {
    console.log('origin:'+item.pagepermisson)
    let originDatasource = dataSource;
    
    originDatasource.map(data =>{
        if(data.id == item.id){
          console.log('origin data-pagepermission:'+data.pagepermisson)
          data.pagepermisson = !data.pagepermisson
          console.log('after data-pagepermission:'+data.pagepermisson)
        }
      })
    
    console.log(item)
    setDataSource([...originDatasource])
  } */
  const switchMethod = item => {

  }
  
  const confirmMethod = (item) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item);
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };
  const deleteMethod = (item) => {
    //console.log(item)
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:5000/rights/${item.id}`)
    }else{
      //console.log(item.rightId)
      let list = dataSource.filter(data=>data.id===item.rightId)
      list[0].children = list[0].children.filter(data=>data.id!==item.id)
      //console.log(list,dataSource)
      setDataSource([...dataSource])
      axios.delete(`http://localhost:5000/children/${item.id}`)
    }


  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} 
       pagination={{
        pageSize:5
       }}/>
    </div>
  )
}
