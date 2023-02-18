import React,{useState} from 'react'
import {PageHeader} from '@ant-design/pro-layout'
import { Steps } from 'antd';

export default function NewsAdd() {
  //const description = 'This is a description.';
  const [current, SetCurrent] = useState(0)
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
    </div>
  )
}
