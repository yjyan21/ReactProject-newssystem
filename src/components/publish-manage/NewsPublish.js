import React, {useState} from 'react'
import {Table, Modal} from 'antd'
import {ExclamationCircleFilled, } from '@ant-design/icons'

import axios from 'axios'

const { confirm } = Modal;

export default function NewsPublish(props) {
  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: 'News Title',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'News Category',
      dataIndex: 'category',
      render:(category)=>{
        return <b>{category.title}</b>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return (
          <div>
            {props.button(item.id)}
          </div>)
        }
    },
  ];

  const switchMethod = item => {
    item.pagepermisson = (item.pagepermisson===1?0:1)
    setDataSource([...dataSource])
    if(item.grade===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
    })
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
    })
  }
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
      <Table dataSource={props.dataSource} columns={columns} 
       pagination={{
        pageSize:5
       }}
       rowKey={item=>item.id}
       />
    </div>
  )
}
