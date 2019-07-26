import React from 'react'
import { fetchProject, notifyWarn, workOnTask } from '../../../common/Actions';
import { Card, Button, List } from 'antd';
import AddTask from './AddTask';
import { Store } from '../../../common/Store';
import useLoadUser from '../users/useLoadUser';
import { idFromUrl } from '../../../utils/WebUtil';


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
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Projects" bordered={false} > 
            <p>Name: {project.name}</p>
            <p>Description: {project.description}</p>
            <p>Funding: {project.funding}</p>
            <p>Lifecycle: {project.lifecycle}</p>
        </Card>
      </div>
      
      <div style={{ background: '#ECECEC', padding: '30px' }}>
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
             
              <Button
                className="ml-auto"
                type="dashed"
                onClick={async () => {
                  //if they just added task, it won't have id (until refresh)
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
                    window.location = `/tasks/${item.id}`
                  }}
                >
               View
              </Button>
             
           
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

