import React from 'react'
import { Store } from '../../../common/Store';
import { idFromUrl } from '../../../utils/WebUtil';
import { fetchTask, fetchEventTypes, setTaskCompleted } from '../../../common/Actions';
import { ITask, IEventType, IVerifiableTaskEvent, ITaskEventTypes } from './../../../common/Interfaces';
import { Card, Button } from 'antd';
import TaskEvent from './TaskEvent';
import useLoadUser from '../users/useLoadUser';



export default function ShowTask() {
  const { state, dispatch } = React.useContext(Store);
  const [userNames, setUserNames] = React.useState<any>([]);
  const task: ITask = state.currentTask;
  const events: Array<IVerifiableTaskEvent>| undefined = task.events;
  const eventTypes: Array<IEventType> = state.eventTypes;
 
  const [haveDesignEvent, setHaveDesignEvent] = React.useState(false);
  const [haveTaskEvent, setHaveTaskEvent] = React.useState(false);
  const [haveCompletionEvent, setHaveCompletionEvent] = React.useState(false);

  /* That user clicked */
  const [showDesign, setShowDesign] = React.useState(false);
  const [showTask, setShowTask] = React.useState(false);
  const [showComplete, setShowComplete] = React.useState(false);

  /* event objects of specifc type */
  const [designEvent, setDesignEvent] = React.useState<IVerifiableTaskEvent |undefined>(undefined);
  const [taskEvent, setTaskEvent] = React.useState<IVerifiableTaskEvent |undefined>(undefined);
  const [completionEvent, setCompletionEvent] = React.useState<IVerifiableTaskEvent |undefined>(undefined);


  useLoadUser();
  const user = state.currentUser;


  React.useEffect(() => {
    const loadTask = async() => {
      let taskId = idFromUrl();
      await fetchEventTypes(dispatch);
      await fetchTask(dispatch, taskId);
    }
    loadTask();
  }, []);


  React.useEffect(() => {
    if (events){
      events.forEach(e => {
        //console.log("event id, task_id, attachment:", e.event_type_id, e.task_id, e.attachment_link_text);
        if (e.event_type_id===ITaskEventTypes.DESIGN_REVIEW_ID){
          setHaveDesignEvent(true);
          setDesignEvent(e);
        }else if (e.event_type_id===ITaskEventTypes.TASK_REVIEW_ID){
          setHaveTaskEvent(true);
          setTaskEvent(e);
        }else if (e.event_type_id===ITaskEventTypes.COMPLETION_REVIEW_ID){
          setHaveCompletionEvent(true);
          setCompletionEvent(e);
        }else {
          console.error("event type exists, without matching the expected ids, there is a issue with serve state vs client state");
        }
      });
    }
  }, [events]);


  /* just user names */
  React.useEffect(() => {
    if (task && task.working_on){     
      const mappedNames = task.working_on.map(user => user.name );
      setUserNames(mappedNames);
    }
  }, [task]);


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

        {!haveDesignEvent ? 
          <Button
            type="dashed"
            onClick={ () => {
              setShowDesign(true);
            }}
            >Submit Design Review
            </Button>
        :
            ''
        }

        {!haveTaskEvent ? 
            <Button
              type="dashed"
              onClick={ () => {
                setShowTask(true);
              }}
              >Submit Task Review
              </Button>
          :
              ''
          }

        {!haveCompletionEvent ? 
            <Button
              type="dashed"
              onClick={ () => {
                setShowComplete(true);
              }}
              >Submit Completion Review
              </Button>
          :
              ''
          }

          {haveCompletionEvent ?
             <Button
             onClick={async() => {    
                await setTaskCompleted(dispatch, task, user);          
             }}
             >Close Task as Complete
             </Button>
          :
            ""
          }

        </Card>
      </div>

      {haveDesignEvent || showDesign ? 
          <TaskEvent event={designEvent} eventTypeId={ITaskEventTypes.DESIGN_REVIEW_ID} />
        :
          ''
      }

      {haveTaskEvent || showTask ? 
          <TaskEvent event={taskEvent} eventTypeId={ITaskEventTypes.TASK_REVIEW_ID}/>
        :
          ''
      }

      {completionEvent || showComplete ? 
          <TaskEvent event={completionEvent} eventTypeId={ITaskEventTypes.COMPLETION_REVIEW_ID}/>
        :
          ''
      }
   </React.Fragment>
  )
}
