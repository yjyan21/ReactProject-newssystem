import React,{useState} from 'react'
import {PageHeader} from '@ant-design/pro-layout'
import { Steps, Button } from 'antd';
import style from './News.css'

export default function NewsAdd() {
  //const description = 'This is a description.';
  
  const [current, setCurrent] = useState(2)
  const handlePrevious = () => {
    setCurrent(current-1)
  }
  const handleNext = () => {
    setCurrent(current+1)
  }
  return (
    <div>
      <PageHeader
        className="site-page-header" 
        title="Write News"
        subTitle="This is a subtitle" 
        />
      <Steps
        current={current}
        items={[
          {
            title: 'Basic Information',
            description: 'Title, Category',
          },
          {
            title: 'News Content',
            description: 'News topic content',
            // subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting audit',
            description: 'Draft or waiting audit',
          },
        ]}
      />
      
      <div className={current===0?'':style.active}>1111111
        <input type="text"/>
      </div>
      <div className={current===1?'':style.active}>22222
        <input type="text"/>
      </div>
      <div className={current===2?'':style.active}>3333
        <input type="text"/>
      </div>

      <div style={{marginTop:'50px'}}>
        {
          current>0 && <span>
            <Button type="primary" onClick={()=>handlePrevious()}>上一步</Button>
            </span>
        }
        {
          current === 2 && <span>
            <Button type="primary">Save Draft</Button>
            <Button danger>Submit to Audit</Button>
            </span>
        }
        {
          current<2 && <Button type="primary" onClick={()=>handleNext()}>下一步</Button>
        }
        
      </div>
    </div>
  )
}
