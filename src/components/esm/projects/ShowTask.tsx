import React from 'react'
import { Store } from '../../../common/Store';
import { idFromUrl } from '../../../utils/WebUtil';
import { fetchTask, fetchEventTypes } from '../../../common/Actions';
import { ITask, IUser, IEventType, IVerifiableTaskEvent } from './../../../common/Interfaces';
import { Card, Button } from 'antd';


export default function ShowTask() {
  const { state, dispatch } = React.useContext(Store);
  const [userNames, setUserNames] = React.useState<any>([]);
  const task: ITask = state.currentTask;
  const events: Array<IVerifiableTaskEvent>| undefined = task.events;
  const eventTypes: Array<IEventType> = state.eventTypes;
  //const users = state.currentTask.include; //include node from json



  React.useEffect(() => {
    const loadTask = async() => {
      let taskId = idFromUrl();
      await fetchEventTypes(dispatch);
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


  console.log("events", events);

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

          <Button
            type="dashed"
            onClick={ () => {
              console.log("adding design review")
              
            }}
          >
             Submit Design Review
          </Button>
          <Button
            type="dashed"
            onClick={ () => {
              console.log("adding task review")
              
            }}
          >
             Submit Task Review 
          </Button>
          <Button
            type="dashed"
            onClick={ () => {
              console.log("adding completion review")
              
            }}
          >
             Submit for Completion
          </Button>
        </Card>
      </div>

      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Users working on this" bordered={false} > 
          { userNames.toString() }
        </Card>
      </div>
   </React.Fragment>
  )
}


/*

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

*/