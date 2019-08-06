import React from 'react'
import { Card, Input, Button } from 'antd';
import { IEventType, IVerifiableTaskEvent, TaskEventTypes } from '../../../common/Interfaces';
import { Store } from '../../../common/Store';
import Task from '../../../views/Task';
import { notifyWarn, submitEvent, notify } from '../../../common/Actions';


export interface ITaskEventProps{
  event: IVerifiableTaskEvent| undefined;
}


export default function TaskEvent(props: ITaskEventProps) {
  let event: IVerifiableTaskEvent| undefined = props.event;
  //let eventType: IEventType = props.eventType;

  console.log("event:", event);

  
  return (
    <React.Fragment>
      <p>TaskEvent</p>
    </React.Fragment>
  )
}




/*
export default function TaskEvent(props: ITaskEventProps) {
  const { dispatch } = React.useContext(Store);
  const [linkText, setLinkText] = React.useState('');
  const [eventTypeId, setEventTypeId] = React.useState(-1);
  const [eventTypeObj, setEventTypeObj] = React.useState<IVerifiableTaskEvent| any>({});
  

  React.useEffect(() => {
    setEventTypeObj(eventTypeFor(props.eventTypeName));
  }, [props])


 
  const eventTypeFor = (eventTypeName: TaskEventTypes): IEventType => {
    let retval:IEventType = {
      name: '',
      description: ''
    }; 

    for (let i=0; i < props.eventTypes.length; i++){
      if (i===0 && props.eventTypeName===TaskEventTypes.DESIGN_REVIEW){
        setEventTypeId(1);
        return props.eventTypes[i];
      }else if (i===1 && props.eventTypeName===TaskEventTypes.TASK_REVIEW){
        setEventTypeId(2);
        return props.eventTypes[i];
      }else if (i===2 && props.eventTypeName===TaskEventTypes.COMPLETION_REVIEW){
        setEventTypeId(3);
        return props.eventTypes[i];
      }
    }

    if (retval.name==='' || retval.description===''){
      console.error('TaskEvent.eventTypeFor() is likely out of date with serverside EventTypes');
      retval.name = 'ERROR';
      retval.description = 'ERROR';
    }
    return retval;
  }
  

  

  return (
    <div className="antDDefault"}>
      <Card title={eventType.name} bordered={false} > 
        <p>{eventType.description}</p>
        <Input
          id="submission link"
          className="form-control"
          placeholder="Link to submission content"
          value={linkText}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setLinkText(value);
          }}
        />
        <div className="row">
          <Button
            type="dashed"
            onClick={async () => {
              if (props.taskId && props.taskId > 0){
                let event:IVerifiableTaskEvent = {
                  task_id: props.taskId,
                  event_type_id: eventTypeId,
                  attachment_link_text: linkText
                }
                await submitEvent(dispatch, event);
              } else {
                notifyWarn("The task id was not valid, a valid task id is required");
              }             
            }}
          >
            Submit
          </Button>
        </div>

      </Card>
    </div>
  )
}
*/