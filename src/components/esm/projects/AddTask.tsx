import React from 'react'
import { Card, Button, Input } from 'antd';
import { notify } from '../../../common/Actions';
import Axios from 'axios';

export default function AddTask(props:any) {
  const [name, setName] = React.useState('');
  const projectId = props.projectId;

  console.log("projectid", projectId);

  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="Add New Task" bordered={false}> 
      <Input
          id="add-task-name"
          className="form-control"
          placeholder="name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setName(value);
          }}
        />
      <Button
            type="dashed"
            onClick={async () => {
              const result = await Axios.post(
                "/api/v1/tasks",
                {
                  project_id: projectId,
                  name: name
                }
              );
              notify("task added successfully");
            }}
          >
             Add
          </Button>
    </Card>
  </div>
  )
}

