import React,{useEffect, useState} from 'react'
import {PageHeader} from '@ant-design/pro-layout'
import {HeartTwoTone} from '@ant-design/icons'
import {Descriptions} from 'antd'
import axios from 'axios'
import moment from 'moment'

export default function Detail(props) {
	const [newsInfo,setNewsInfo] = useState(null)
	useEffect(()=>{
		axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res=>{
				setNewsInfo({
                    ...res.data,
                    view:res.data.view+1
                })
                return res.data
			}).then(res=>{
                axios.patch(`/news/${props.match.params.id}`,{
                    view:res.view+1
                })
            })
		},[props.match.params.id])
		
		// const auditStateList = ["未审核","审核中","已通过","未通过"]
		// const publishStateList = ["未发布","待发布","已上线","已下线"]
		// const colorList = ["black","orange","green","red"]

        const handleStar = () => {
            setNewsInfo({
                ...newsInfo,
                star:newsInfo.star+1
            })
            axios.patch(`/news/${props.match.params.id}`,{
                star:newsInfo.star+1
            })
        }

  return (
    <div>
      {
				newsInfo && <div>
					<PageHeader 
				onBack={() => window.history.back()}
				title={newsInfo.title}
				subTitle={<div>
                    {newsInfo.category.title}
                    <HeartTwoTone twoToneColor="#eb2f96" style={{paddingLeft:'5px'}}
                      onClick={()=>handleStar()} />
                </div>}
			>
				<Descriptions size="sma11" column={3}>
					<Descriptions.Item label="Creator">{newsInfo.author}</Descriptions.Item>
					{/* <Descriptions.Item label="Created time">
						<a>{moment(newsInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}</a>
					</Descriptions.Item> */}
					<Descriptions.Item label="Published Time">{newsInfo.publishTime?moment(newsInfo.publishTime)
						.format('YYYY-MM-DD HH:mm:ss'):"--"}</Descriptions.Item>
					<Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
					{/* <Descriptions.Item label="Audit status">
						<span style={{color:colorList[newsInfo.auditState]}}>{auditStateList[newsInfo.auditState]}</span>
					</Descriptions.Item> */}
					{/* <Descriptions.Item label="Publish status">
						<span style={{color:colorList[newsInfo.publishState]}}>{publishStateList[newsInfo.publishState]}</span>
                    </Descriptions.Item>	 */}
						{/* 上面---开始这个数据一致不显示，后来发现db.json文件中这里单词都是小写publishstate; 其实不是都是，有错误的*/}
					
					<Descriptions.Item label="Number of Visit">
						<span style={{color:'#00ff00'}}>{newsInfo.view}</span>
					</Descriptions.Item>
					<Descriptions.Item label="Number of like">
						<span style={{color:'#00ff00'}}>{newsInfo.star}</span>
					</Descriptions.Item>
					<Descriptions.Item label="Number of comments">
						<span style={{color:'#00ff00'}}>0</span>
					</Descriptions.Item>
				</Descriptions>
			</PageHeader>
			<div dangerouslySetInnerHTML={{__html:newsInfo.content}} 
			style={{border:"1px solid #f5f5f5",padding:'18px'}}></div>
				</div>
			}
    </div>
  )
}
