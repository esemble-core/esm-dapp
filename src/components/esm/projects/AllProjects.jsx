import React from 'react'
import { List, Card, Button } from 'antd';
import { fetchProjects } from '../../../common/Actions';
import { Store } from '../../../common/Store';
import { sliceDots } from '../../../utils/StrUtil';
import { appendedLookup, FUNDING_KEY, EN, LIFECYCLE_KEY } from '../../../common/Lookup';


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
              <a href={`/project/${item.id}`}>{sliceDots(item.name, 25)}</a>    
              <p className="ml-auto">{sliceDots(item.description, 25)}</p>     
              <p className="ml-auto">{appendedLookup(EN, FUNDING_KEY, item.funding)}</p>   
              <p className="ml-auto">{appendedLookup(EN, LIFECYCLE_KEY, item.lifecycle)}</p>            
              <Button className="ml-auto">
                Accept
              </Button>
              <Button className="ml-auto">
                Reject
              </Button>
            </List.Item>
          )}
        />    
    </Card>
  </div>
  )
}