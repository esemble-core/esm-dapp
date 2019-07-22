import React from "react";
import { Input, Card, Form, Slider, Radio, Button } from "antd";
import Axios from "axios";
import { notify } from "../../../common/Actions";
import { RadioChangeEvent } from "antd/lib/radio";

export default function AddProjectToRPC() {
  const [projName, setProjName] = React.useState("");
  const [projDescription, setProjDescription] = React.useState("");
  const [funding, setFunding] = React.useState(1);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Card title="Propose a Project" bordered={false}>
        <Form
          {...formItemLayout}
          onSubmit={async() => {
            const result = await Axios.post(
              "/api/v1/projects",
              {
                lifecycle: 1,
                name: projName,
                description: projDescription,
                funding: funding
              }
            );
            notify("project proposal submitted successfully");
          }}
        >
          <p className="strong-p">Enter details for new project project</p>
          <Form.Item label="Project Name">
            <Input
              id="add-proj-name"
              className="form-control"
              placeholder="Project Name"
              value={projName}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const { name, value }: any = e.target;
                setProjName(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Project Description">
            <Input
              id="add-proj-desc"
              className="form-control"
              placeholder="Project Description"
              value={projDescription}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const { name, value }: any = e.target;
                setProjDescription(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Project Stage">
            <Slider
              marks={{
                0: "Not Accepted",
                25: "Proposed",
                50: "Approved",
                75: "Complete",
                100: "Archived"
              }}
              value={25}
            />
          </Form.Item>
          <Form.Item label="Requested Funding Level in ESM Tokens">
            <Radio.Group 
              onChange={(e: RadioChangeEvent) => {
                const { name, value }: any = e.target;
                setFunding(value);
              }}
            >
              <Radio.Button value="1" checked={funding===1}>&lt;= 10k</Radio.Button>
              <Radio.Button value="2">&gt;10k &lt; 100k</Radio.Button>
              <Radio.Button value="3">&gt;100k &lt; 500k</Radio.Button>
              <Radio.Button value="4">&gt;500k &lt; 2M</Radio.Button>
              <Radio.Button value="5">&gt;2M &lt; 5M</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button 
              type="dashed"
              htmlType="submit">
                Submit Proposal
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
