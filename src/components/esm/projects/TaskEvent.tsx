import React from 'react'
import { Card, Input, Button } from 'antd';
import { IEventType, IVerifiableTaskEvent, ITaskEventTypes, ITaskEventVerification } from '../../../common/Interfaces';
import { Store } from '../../../common/Store';
import { addEvent, verifyEvent, notifyWarn } from '../../../common/Actions';
import useLoadUser from '../users/useLoadUser';



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
    let retVal:IEventType| undefined = undefined;
    eventTypes.forEach(et => {
      if (et.id === id){
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
  const [showVerify, setShowVerify] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="antDDefault">
      <Card title={eventType? eventType.name : 'Task Events'} bordered={false} > 
        <p>Event Type: {eventType.name}</p>
        <p>Attachment Link: {event.attachment_link_text}</p>
        <p>Verifications: {event.task_event_verifications ?  event.task_event_verifications.length : '-'}</p>
                
        <Button
         type="dashed"
         onClick={ async() => {
           console.log("verifyEvent enable");
           setShowVerify(true);
         }}
        >
          Verify The Completion of this Event
        </Button>
        <Button>
          Update
        </Button>

         {
           showVerify ?
            <SubmitEventVerification event={event} />
           :
            ''
         }
         
      </Card>
    </div>
  </React.Fragment>
  )
}


function SubmitEventVerification(props: any){
  const { state, dispatch } = React.useContext(Store);
  useLoadUser();
  const user = state.currentUser;
  const task = state.currentTask;
  const [verificationText, setVerificationText] = React.useState<string>('');
  const event: IVerifiableTaskEvent = props.event;

  return (
    <React.Fragment>
      <div className="antDDefault">
        <p>By submitting this verification you providing the community a verification that in your
          opinion you feel this task was completed as you would have expected.
        </p>
        <Input
         id="task-event-verification-id"
         className="form-control"
         placeholder="Comments"
         value={verificationText}
         onChange={(e: React.FormEvent<HTMLInputElement>) =>{
           const { name, value }: any = e.target;
           setVerificationText(value);
          }}
        />
        <Button
         type="dashed"
         onClick={ async() => {
           //console.log("verfication for event:", event);

           if (event && event.id){
            let eventVerification: ITaskEventVerification = {
              comment: verificationText,
              user_id: user.id,
              verifiable_task_event_id: event.id
            }
            await verifyEvent(dispatch, eventVerification, user);
           }else {
             notifyWarn('The event id was not available, there is data out of sync. Please refresh and try again.')
           }
         }}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}

function SubmitEventData(props: any) {
  const { state, dispatch } = React.useContext(Store);
  const task = state.currentTask;
  const eventType = props.eventType;
  const [submissionText, setSubmissionText] = React.useState<string>('');

  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title={eventType? eventType.name : 'Task Events'} bordered={false} > 
          <p>Event Description: {eventType ? eventType.description : ''}</p>
          <Input
            id="verification-comments-id"
            className="form-control"
            placeholder="Comments"
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
