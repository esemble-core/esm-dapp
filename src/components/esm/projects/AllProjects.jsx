import React from 'react'
import Axios from 'axios';
import { List, Card } from 'antd';
import { notifyError } from '../../../common/Actions';

export default function AllProjects() {
  const [projArray, setProjArray] = React.useState([]);

  React.useEffect(() => {
    const loadProjects = async() => {
      console.log("loading projects from api");
      try{
        const result = await Axios(
          '/api/v1/projects',
        );
        setProjArray(result.data.data);
        }catch (error){
          console.error("Could not connect to server");
          notifyError("Could not connect to server, please try again later");
        }
    }
    loadProjects();
  }, []);


  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="All Projects" bordered={false} >
    <List
          header="Projects"
          bordered
          dataSource={projArray}
          renderItem={item => (
            <List.Item 
              key={item.name}
            >
              
              <a href={`/project/${item.id}`}>{item.name}</a>    
              <p>{" | "}{item.description}</p>     
              <p>{" | "}{item.funding}</p>   
              <p>{" | "}{item.lifecycle}</p>            
            </List.Item>
          )}
        />    
    </Card>
  </div>
  )
}