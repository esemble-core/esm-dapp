import React from 'react'
import Axios from 'axios';
import { notifyError } from '../../../common/Actions';
import { Card } from 'antd';

export default function ShowProject(props:any) {
  const [project, setProject] = React.useState({});
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
        setTasks(result.data.include.tasks);
        }catch (error){
          console.error("Could not connect to server");
          notifyError("Could not connect to server, please try again later");
        }
    }
    loadProj();
  }, [])
  
  

  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Project" bordered={false} >
         <p>Project{JSON.stringify(project)}</p>
          <p>Tasks{JSON.stringify(tasks)}</p>
       </Card>
    </div>
  )
}
