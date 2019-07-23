import React from 'react'
import { fetchProject } from '../../../common/Actions';
import { Card, Button, List } from 'antd';
import AddTask from './AddTask';
import { Store } from '../../../common/Store';


export default function ShowProject(props) {
  const { state, dispatch } = React.useContext(Store);
  const project = state.currentProject;
  const tasks = state.tasks;
  const [showAddTasks, setShowAddTasks] = React.useState(false);

  console.log("project", project);

  React.useEffect(() => {
    const loadProj = async() => {
      let url = window.location.toString();
      let projectId = url.split("/").pop();

      fetchProject(dispatch, projectId);
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
              key={item.name}
            >
              <p className="strong-p">{item.name}</p>    
           
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

