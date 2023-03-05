import { useState } from 'react'
import './App.css'
import { Form, Upload, Button, message} from 'antd'

function App() {
  const [fileList, setFileList] = useState([])

  return (
    <>
      <Form onFinish={(values)=>{
        console.log({values});
      }}
      >
        <Form.Item 
          label ="Profile Picture" 
          name='profilePicture'
          valuePropName='fileList'
          getValueFromEvent={(event)=>{
            return event?.fileList;
          }}
          rules={[
          {
            required:true,
            message: "Please upload your profilr picture."
          },
          {
            validator(_, fileList){
              return new Promise((resolve, reject)=>{
                if(fileList && fileList[0].size > 9000000) {
                  reject("File size exceeded");
                } else {
                  resolve("Success");
                }
              });
            }
          }
      ]}
        >
          <Upload
          maxCount={1} 
           beforeUpload={(file)=>{
            return new Promise((resolve, reject)=>{
              if(file.size > 9000000) {
                reject("File size exceeded");
                message.error("File size exceeded")
              } else {
                resolve("Success");
              }
            })
          }}
            // other way using action ......  action=""
            customRequest={(info)=>{
              setFileList([info.file])
            }}
            showUploadList={false}
          >
            <Button>Upload Profile Picture</Button>
            {fileList[0]?.name}
          </Upload>
        </Form.Item>
        <Button type='primary' htmlType='submit'block>Submit</Button>
      </Form>
    </>
  )
}

export default App
