import {useEffect, useState} from 'react'
import axios from 'axios'
import {notification} from 'antd'

function usePublish(type){
  const [dataSource, setDataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(res=>{
      // console.log(res.data)
      setDataSource(res.data)
    })
  },[username,type])

  const handlePublish = (id) =>{
    setDataSource(dataSource.filter(data=>data.id!==id))
    axios.patch(`/news/${id}`,{
        "publishState": 2,
        "publishTime": Date.now()
      }).then(res=>{
        //props.history.push("/publish-manage/published")
        notification.info({
          message:`Alert`, //为什么不是单引号？
          description:
          `You could go to [Publish manage / Published] to check you News content`,
          placement:"bottomRight",
      })
    })
  }
  const handleSunset = (id) =>{
    setDataSource(dataSource.filter(data=>data.id!==id))
    axios.patch(`/news/${id}`,{
        "publishState": 3,
      }).then(res=>{
        //props.history.push("/publish-manage/published")
        notification.info({
          message:`Alert`, //为什么不是单引号？
          description:
          `You could go to [Publish manage / Sunset] to check you News content`,
          placement:"bottomRight",
      })
    })
  }
  const handleDelete = (id) =>{
    setDataSource(dataSource.filter(data=>data.id!==id))
    axios.delete(`/news/${id}`).then(res=>{
        notification.info({
          message:`Alert`, //为什么不是单引号？
          description:
          `You have delete offline News`,
          placement:"bottomRight",
      })
    })
  }
  return {
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete
  }
}
export default usePublish