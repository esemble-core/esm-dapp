import React from 'react'
import { Card, Input } from 'antd';
import { IEventType, IVerifiableTaskEvent } from '../../../common/Interfaces';
import { Store } from '../../../common/Store';
import { Button } from 'antd/lib/radio';



export interface ITaskEventProps{
  event: IVerifiableTaskEvent| undefined;
}


export default function TaskEvent(props: ITaskEventProps) {
  let event: IVerifiableTaskEvent| undefined = props.event;
  const { state } = React.useContext(Store);
  const eventTypes: Array<IEventType> = state.eventTypes;
  const [eventType, setEventType] = React.useState<IEventType| undefined>(undefined);
  const [haveEventData, setHaveEventData] = React.useState<boolean>(false);


  React.useEffect(() => {
    if (event){
      if (event.event_type_id && event.task_id){
        setHaveEventData(true);
      }

      let eventType: IEventType| undefined = eventTypeFor(event);
      if (eventType){
        setEventType(eventType);
      }else {
        console.error("Event type is unexpectedly not resolved in TaskEvent.useEffect()");
      }
    } else {
      console.warn("expecting an event in TaskEvent.useEffect()");
    }
  }, [props]);


  const eventTypeFor = (e: IVerifiableTaskEvent):IEventType| undefined => {
    let retVal:IEventType| undefined = undefined;
    eventTypes.forEach(et => {
      if (et.id===e.event_type_id){
        retVal = et;
      }
    });
    return retVal;
  }

  
  return (
    <React.Fragment>
      {haveEventData ?
        <ShowEventData event={event} eventType={eventType} />
      :
        <SubmitEventData eventType={eventType} />
      }
    </React.Fragment>
  )
}


function ShowEventData(props: any) {
  const eventType = props.eventType;
  const event: IVerifiableTaskEvent = props.event;

  return (
    <React.Fragment>
      <div className="antDDefault">
      <Card title={eventType? eventType.name : 'Task Events'} bordered={false} > 
        <p>Event Type: {eventType.name}</p>
        <p>Attachment Link: {event.attachment_link_text}</p>
        <Button>
          Verify
        </Button>
        <Button>
          Update
        </Button>
      </Card>
    </div>
  </React.Fragment>
  )
}

function SubmitEventData(props: any) {
  const eventType = props.eventType;

  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title={eventType? eventType.name : 'Task Events'} bordered={false} > 
          <p>Event Description: {eventType ? eventType.description : ''}</p>
          <Input></Input>
          <Button>Submit For Review</Button>
        </Card>
      </div>
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