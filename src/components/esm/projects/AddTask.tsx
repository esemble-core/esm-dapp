import React from 'react'
import { Card, Button, Input } from 'antd';
import { addTask } from '../../../common/Actions';
import { ITask } from '../../../common/Interfaces';
import { Store } from '../../../common/Store';

export default function AddTask(props:any) {
  const { dispatch } = React.useContext(Store);
  const [name, setName] = React.useState('');
  const projectId = props.projectId;


  return (
    <div className="antDDefault">
    <Card title="Add New Task" bordered={false}> 
      <Input
          id="add-task-name"
          className="form-control"
          placeholder="task name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setName(value);
          }}
        />
      <Button
            type="dashed"
            onClick={async () => {
             let newTask: ITask = {
               project_id: projectId,
               name: name
              }
              await addTask(dispatch, newTask);
              setName('');
            }}
          >
        Add
      </Button>
    </Card>
  </div>
  )
}

