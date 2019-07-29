import React from 'react'
import { Store } from '../../../common/Store';
import { idFromUrl } from '../../../utils/WebUtil';
import { fetchTask } from '../../../common/Actions';
import { ITask, IUser } from './../../../common/Interfaces';
import { Card } from 'antd';

export default function ShowTask() {
  const { state, dispatch } = React.useContext(Store);
  const [userNames, setUserNames] = React.useState<any>([]);
  const task:ITask = state.currentTask;
  //const users = state.currentTask.include; //include node from json

  React.useEffect(() => {
    const loadTask = async() => {
      let taskId = idFromUrl();
      await fetchTask(dispatch, taskId);
    }
    loadTask();
  }, [])

  
  /* just user names */
  React.useEffect(() => {
    console.log("in showtask.useeffect[task] change")
    if (task && task.working_on){     
      const mappedNames = task.working_on.map(user => user.name );
      setUserNames(mappedNames);
    }
  }, [task])


  return (
    <React.Fragment>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Task" bordered={false} > 
          <p>Task Name: {task.name}</p>
          <p>Complete: {task.done ? "yes" : "not yet"}</p>
          <p>Task Funding</p>
          <p>{task.task_fundings ? 
                task.task_fundings.map(function(funding){
                  return <li key={funding.id}>{funding.amount} {funding.token_symbol}</li>;
                }) 
                : ''
              }
          </p>
        </Card>
      </div>

      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Users working on this" bordered={false} > 
          { userNames.toString() }
        </Card>
      </div>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Design submission" bordered={false} > 
          <p>It is generally expected that before you work on your task you submit a Design
            for the community to review and provide you suggestion on. This will also confirm 
            the funding for the task        
         </p>
        </Card>
      </div>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Task submission" bordered={false} > 
          <p>Submit a link to the completed task for the community to review</p>

        </Card>
      </div>

      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Task completion" bordered={false} > 
          <p>Mark this task as complete for the community to review</p>

        </Card>
      </div>
   </React.Fragment>
  )
}
