import React from 'react'
import { IVerifiableTaskEvent, TaskEventTypes } from '../../../common/Interfaces';
import { Card, Button } from 'antd';
import TaskEvent from './TaskEvent';


export interface TaskEventContainerProps {
  events: Array<IVerifiableTaskEvent>;
}


export default function TaskEventContainer(props :TaskEventContainerProps) {
  const events: Array<IVerifiableTaskEvent> = props.events;
  /* Whether button should be displayed, based on current state */
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


  React.useEffect(() => {
    events.forEach(e => {
      //console.log("event id, task_id, attachment:", e.event_type_id, e.task_id, e.attachment_link_text);
      if (e.event_type_id===TaskEventTypes.DESIGN_REVIEW_ID){
        setHaveDesignEvent(true);
        setDesignEvent(e);
      }else if (e.event_type_id===TaskEventTypes.TASK_REVIEW_ID){
        setHaveTaskEvent(true);
        setTaskEvent(e);
      }else if (e.event_type_id===TaskEventTypes.COMPLETION_REVIEW_ID){
        setHaveCompletionEvent(true);
        setCompletionEvent(e);
      }else {
        console.error("event type exists, without matching the expected ids, there is a issue with serve state vs client state");
      }
    });

  }, [props]);


  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title="Task Events" bordered={false} > 
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

       </Card>
      </div>

      {haveDesignEvent || showDesign ? 
          <TaskEvent event={designEvent} />
        :
          ''
      }

      {haveTaskEvent || showTask ? 
          <TaskEvent event={taskEvent}/>
        :
          ''
      }

      {completionEvent || showComplete ? 
          <TaskEvent event={completionEvent}/>
        :
          ''
      }

    </React.Fragment>
  )
}

/*
{showDesign ? <TaskEvent taskId={task.id} eventTypeName={TaskEventTypes.DESIGN_REVIEW} eventTypes={eventTypes}/> :''}
{showTask ? <TaskEvent taskId={task.id} eventTypeName={TaskEventTypes.TASK_REVIEW} eventTypes={eventTypes}/> :''}
{showComplete ? <TaskEvent taskId={task.id} eventTypeName={TaskEventTypes.COMPLETION_REVIEW} eventTypes={eventTypes}/> :''}


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
/</div>


*/