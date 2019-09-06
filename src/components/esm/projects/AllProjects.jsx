import React from 'react'
import { List, Card, Button } from 'antd';
import { fetchProjects, approveProject, rejectProject } from '../../../common/Actions';
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
              <Button 
                className="ml-auto"
                type="dashed"
                onClick={async() => {
                    console.log("approve", item.id);
                    await approveProject(item);
                    await fetchProjects(dispatch, true);
                  }
                }
              >
                Accept
              </Button>
              <Button className="ml-auto"
                type="dashed"
                onClick={async() => {
                    console.log("reject", item.id);
                    await rejectProject(item);
                    await fetchProjects(dispatch, true);
                  }
                }
              >
                Reject
              </Button>
            </List.Item>
          )}
        />    
    </Card>
  </div>
  )
}


/*
<Button
                    className="ml-auto"
                    type="dashed"
                    onClick={async () => {
                      //if they just added task, it will be ther in state, but not 
                      //have hit the server, so it won't have id (until refresh/refetch)
                      if (item.id===undefined){
                        notifyWarn("This task can not currently be worked on, it may be too new (try refreshing screen).");
                      }
                      
                      await workOnTask(dispatch, user, item);
                    }}
                    >

*/