import React from 'react'
import Axios from 'axios';
import { notifyError } from '../../../common/Actions';
import { Card, Button } from 'antd';
import { IProject } from '../../../common/Interfaces';



export default function ShowProject(props:any) {
  const [project, setProject] = React.useState<IProject | any>({});
  const [tasks, setTasks] = React.useState({});

  React.useEffect(() => {
    const loadProj = async() => {
      let url = new String(window.location);
      let projectId = url.split("/").pop();
//      get('/api/v1/projects/1', params: {with_tasks: 'true'})

      try{
        const result = await Axios(
          `/api/v1/projects/${projectId}`, {params: {with_tasks: true}},
        );
        console.log("result(ShowProject)", result.data)
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
        <Card title="Tasks" bordered={false}> 
        <Button
            type="dashed"
            onClick={ () => {
              console.log("adding task")
            }}
          >
             Add
          </Button>
        </Card>
      </div>
    </React.Fragment>
  )
}
