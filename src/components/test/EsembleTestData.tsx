import React from 'react'
import { Card, Input, Button } from 'antd';
import { generateTestProject, notifyWarn } from '../../common/Actions';

export default function EsembleTestData() {
  const [prefix, setPrefix] = React.useState<string>('');

  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title="Generate Test Project" bordered={false}> 
          <Input
            id="add-prefix"
            className="form-control"
            placeholder="prefix to be appended to all data elements"
            value={prefix}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const { name, value }: any = e.target;
              setPrefix(value);
            }}
          />
          <Button
                type="dashed"
                onClick={async () => {
                  if (prefix !== undefined && prefix !== ''){
                    await generateTestProject(prefix);
                  } else {
                    notifyWarn("you must provide a prefix");
                  }
                }}
              >
            Add
          </Button>
        </Card>
      </div>
    </React.Fragment>
  )
}
