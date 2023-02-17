import React,{forwardRef, useEffect, useState} from 'react'
import {Form, Input, Select } from 'antd'
const {Option} = Select

const UserForm = forwardRef((props, ref)=> {
	const [isDisable, setIsDisable] = useState(false)
    useEffect(()=>{
      setIsDisable(props.isUpdateDisabled)
    },[props.isUpdateDisabled])
    const {roleId,region} = JSON.parse(localStorage.getItem("token"))
    const roleObj = {
        "1":"superadmin",
        "2":"admin",
        "3":"editor"
      }
    const checkRegionDisabled = (item) => {
			if(props.isUpdate){ //如果是更新用户信息
				if(roleObj[roleId]==="superadmin"){
					 return false 
				}else{
					return true
				}}else{ //如果是添加新用户
					if(roleObj[roleId]==="superadmin"){
						return false 
				 }else{
					 return item.value!==region
				 }
				}
    }
		const checkRoleDisabled = (item) => {
			if(props.isUpdate){
				if(roleObj[roleId]==="superadmin"){
					 return false 
				}else{
					return true
				}}else{
					if(roleObj[roleId]==="superadmin"){
						return false 
				 }else{
					 return roleObj[item.id]!=="editor"
				 }
				}
    }

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
                          return <Option value={item.value} key={item.id}
													//这里的retrun不能省略，老师那里并不是省了，假如只有一句代码可以不写return
                          disabled={checkRegionDisabled(item)} >{item.title}</Option>
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
                          return <Option value={item.id} key={item.id}
													disabled={checkRoleDisabled(item)}>
														{item.roleName}
														</Option>
                      })}
                  </Select>
              </Form.Item>


          </Form>
    </div>
  )
})
export default UserForm;
