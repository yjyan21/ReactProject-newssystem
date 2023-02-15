import React,{forwardRef, useState} from 'react'
import {Form, Input, Select } from 'antd'
const {Option} = Select

const UserForm = forwardRef((props, ref)=> {
	const [isDisable, setIsDisable] = useState(false)
  return (
    <div>
          <Form
						  ref={ref}
              layout="vertical" //这句用来控制lable文字和输入框是否左右水平排列；

          >
              <Form.Item
                  name="username"
                  label="UserName"
                  rules={[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  name="region"
                  label="Region"
                  rules={isDisable?[]:[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Select disabled={isDisable}>
                      {props.regionList.map((item) => {
                          return <Option value={item.value} key={item.id}>{item.value}</Option>
                      })}
                  </Select>
              </Form.Item>
              <Form.Item
                  name="roleId"
                  label="Role"
                  rules={[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Select onChange={(value)=>{
										if(value === 1) {
											setIsDisable(true)
											ref.current.setFieldsValue({
												region:""
											})
										}else{
											setIsDisable(false)
										}
									}}>
                      {props.roleList.map((item) => {
                          return <Option value={item.id} key={item.id}>{item.roleName}</Option>
                      })}
                  </Select>
              </Form.Item>


          </Form>
    </div>
  )
})
export default UserForm;
