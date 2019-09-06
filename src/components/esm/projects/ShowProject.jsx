import React from 'react'
import { fetchProject, notifyWarn, workOnTask } from '../../../common/Actions';
import { Card, Button, List } from 'antd';
import AddTask from './AddTask';
import { Store } from '../../../common/Store';
import useLoadUser from '../users/useLoadUser';
import { idFromUrl } from '../../../utils/WebUtil';
import { appendedLookup, EN, FUNDING_KEY, LIFECYCLE_KEY } from '../../../common/Lookup';



export default function ShowProject(props) {
  const { state, dispatch } = React.useContext(Store);
  const project = state.currentProject;
  const tasks = state.tasks;
  const [showAddTasks, setShowAddTasks] = React.useState(false);
  
  useLoadUser();
  const user = state.currentUser;

  
  React.useEffect(() => {
    const loadProj = async() => {
      let projectId = idFromUrl();
      await fetchProject(dispatch, projectId);
    }
    loadProj();
  }, [])
  
  
  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title="Projects" bordered={false} > 
            <p>Name: {project.name}</p>
            <p>Description: {project.description}</p>
            <p>Funding: {appendedLookup(EN, FUNDING_KEY, project.funding)}</p>
            <p>Lifecycle: {appendedLookup(EN, LIFECYCLE_KEY, project.lifecycle)}</p>
        </Card>
      </div>
      
      <div className="antDDefault">
        <Card title="Tasks for Project" bordered={false}> 

        <List
          header="Tasks"
          bordered
          dataSource={tasks}
          renderItem={item => (
            <List.Item 
              key={item.id}
            >
              <p className="strong-p">{item.name}</p> 
              { !item.done ?
                <React.Fragment>
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
                    Work on
                  </Button>
                  <Button
                    className="ml-auto"
                    type="dashed"
                    onClick={()=> {
                        window.location = `/task/${item.id}`
                      }}
                    >
                  View
                  </Button>
                </React.Fragment>
                :
                <p className="ml-auto">Complete</p>
              }  
           
            </List.Item>
          )}
        />    


        <Button
            type="dashed"
            onClick={ () => {
              console.log("adding task")
              setShowAddTasks(true);
            }}
          >
             Add
          </Button>
        </Card>
      </div>
      {showAddTasks ? <AddTask projectId={project.id} /> : ''}
    </React.Fragment>
  )
}
