import React from 'react'
import Axios from 'axios';
import { notifyError } from '../../../common/Actions';
import { Card, Button, List } from 'antd';
import AddTask from './AddTask';


export default function ShowProject(props) {
  const [project, setProject] = React.useState({});
  const [tasks, setTasks] = React.useState([]);
  const [showAddTasks, setShowAddTasks] = React.useState(false);

  React.useEffect(() => {
    const loadProj = async() => {
      let url = window.location.toString();
      let projectId = url.split("/").pop();

      try{
        const result = await Axios(
          `/api/v1/projects/${projectId}`, {params: {with_tasks: true}},
        );
        //console.log("result(ShowProject)", result.data)
        setProject(result.data.data);
        setTasks(result.data.include);
        }catch (error){
          console.error("Could not connect to server");
          notifyError("Could not connect to server, please try again later");
        }
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

