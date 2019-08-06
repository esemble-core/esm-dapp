import React from 'react'
import { List, Card } from 'antd';
import { fetchProjects } from '../../../common/Actions';
import { Store } from '../../../common/Store';


export default function AllProjects() {
  const { state, dispatch } = React.useContext(Store);
  const projArray = state.projects;

  React.useEffect(() => {
    const loadProjects = async() => {
      console.log("loading projects from api");
      await fetchProjects(dispatch);
    }
    loadProjects();
  }, []);


  return (
    <div className="antDDefault">
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