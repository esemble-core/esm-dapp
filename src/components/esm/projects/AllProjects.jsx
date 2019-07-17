import React from 'react'
import Axios from 'axios';
import { List, Card } from 'antd';

export default function AllProjects() {
  const [projArray, setProjArray] = React.useState([]);

  React.useEffect(() => {
    const loadProjects = async() => {
      console.log("loading projects from api");
      const result = await Axios(
        '/api/v1/projects',
      );
      setProjArray(result.data.data);
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
              <p className="strong-p">{item.name}</p>    
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
