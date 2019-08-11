import React from 'react'
import { Card, Input, Button } from 'antd';
import { IEventType, IVerifiableTaskEvent, ITaskEventTypes } from '../../../common/Interfaces';
import { Store } from '../../../common/Store';
import { addEvent } from '../../../common/Actions';



export interface ITaskEventProps{
  event: IVerifiableTaskEvent| undefined;
  eventTypeId: ITaskEventTypes;
}


export default function TaskEvent(props: ITaskEventProps) {
  let event: IVerifiableTaskEvent| undefined = props.event;
  let eventTypeId: ITaskEventTypes = props.eventTypeId;
  const { state } = React.useContext(Store);
  const eventTypes: Array<IEventType> = state.eventTypes;
  const [eventType, setEventType] = React.useState<IEventType| undefined>(undefined);
  const [haveEventData, setHaveEventData] = React.useState<boolean>(false);


  React.useEffect(() => {
    let eventType: IEventType| undefined = undefined;

    if (event && event.event_type_id && event.task_id){
      setHaveEventData(true);
      eventType = eventTypeFor(event.event_type_id);
    }else if (eventTypeId){
      eventType = eventTypeFor(eventTypeId);
    }else {
      console.error("was expecting data that resolved to event type, but it was not found");
    }
    setEventType(eventType);
  }, [props]);


  const eventTypeFor = (id: any) => {
    console.log("eventFor(), id:", id)
    let retVal:IEventType| undefined = undefined;
    eventTypes.forEach(et => {
      if (et.id === id){
        retVal = et;
      }
    });
    return retVal;
  }

  console.log("haveEventData", haveEventData);

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
  const { state, dispatch } = React.useContext(Store);
  const task = state.currentTask;
  const eventType = props.eventType;
  const [submissionText, setSubmissionText] = React.useState<string>('');

  //console.log("SubmitEventData(), props:", props);

  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title={eventType? eventType.name : 'Task Events'} bordered={false} > 
          <p>Event Description: {eventType ? eventType.description : ''}</p>
          <Input
            id="task-event-id"
            className="form-control"
            placeholder="Url to submission"
            value={submissionText}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>{
              const { name, value }: any = e.target;
              setSubmissionText(value);
             }}
            />
          <Button
            type="dashed"
            onClick={ async() => {
              console.log("submission for event:", submissionText);

              let event:IVerifiableTaskEvent = {
                event_type_id: eventType.id,
                attachment_link_text: submissionText,
                task_id: task.id
              }

              await addEvent(dispatch, event);
            }}
          >
            Submit For Review
          </Button>
        </Card>
      </div>
    </React.Fragment>
  )
} 
