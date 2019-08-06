import React from 'react'
import { Store } from '../../../common/Store';
import { idFromUrl } from '../../../utils/WebUtil';
import { fetchTask, fetchEventTypes } from '../../../common/Actions';
import { ITask, IUser, IEventType, IVerifiableTaskEvent, TaskEventTypes } from './../../../common/Interfaces';
import { Card, Button } from 'antd';
import TaskEventContainer from './TaskEventContainer';


export default function ShowTask() {
  const { state, dispatch } = React.useContext(Store);
  const [userNames, setUserNames] = React.useState<any>([]);
  const task: ITask = state.currentTask;
  const events: Array<IVerifiableTaskEvent>| undefined = task.events;
  const eventTypes: Array<IEventType> = state.eventTypes;
 

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
    if (task && task.working_on){     
      const mappedNames = task.working_on.map(user => user.name );
      setUserNames(mappedNames);
    }
  }, [task])


  return (
    <React.Fragment>
      <div className="antDDefault">
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

      {events ? <TaskEventContainer events={events} /> : ''}
   </React.Fragment>
  )
}
