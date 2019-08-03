import React from 'react'
import { Card, Input, Button } from 'antd';
import { IEventType } from '../../../common/Interfaces';


export interface ITaskEventProps{
  eventTypeName: TaskEventTypes;
  eventTypes: Array<IEventType>;
}

export enum TaskEventTypes {
  DESIGN_REVIEW = "Submit for Design Review",
  TASK_REVIEW = "Submit for Task Review",
  COMPLETION_REVIEW = "Submit for Completion Review"
}


export default function TaskEvent(props: ITaskEventProps) {
  const [linkText, setLinkText] = React.useState('');
  
  const eventTypeFor = (eventTypeName: TaskEventTypes): IEventType => {
    let retval:IEventType = {
      name: '',
      description: ''
    }; 

    for (let i=0; i < props.eventTypes.length; i++){
      if (i===0 && props.eventTypeName===TaskEventTypes.DESIGN_REVIEW){
        return props.eventTypes[i];
      }else if (i===1 && props.eventTypeName===TaskEventTypes.TASK_REVIEW){
        return props.eventTypes[i];
      }else if (i===2 && props.eventTypeName===TaskEventTypes.COMPLETION_REVIEW){
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


  const eventTypeObj: IEventType = eventTypeFor(props.eventTypeName);

  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title={eventTypeObj.name} bordered={false} > 
        <p className="strong-p">{eventTypeObj.description}</p>
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
              console.log("submitting event");
            }}
          >
            Submit
          </Button>
        </div>

      </Card>
    </div>
  )
}
