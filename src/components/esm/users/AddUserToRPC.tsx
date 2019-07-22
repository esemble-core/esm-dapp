import React from "react";
import useReactWeb3 from "../../chainstate/useReactWeb3";
import axios from "axios";
import { Card, Input, Button } from "antd";
import { notify } from "../../../common/Actions";


export default function AddUserToRPC() {
  const ethAccount = useReactWeb3();
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");


  
  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Card title="Add User" bordered={false}>
        <p className="strong-p">Enter details for user</p>
        <Input
          id="add-user-name"
          className="form-control"
          placeholder="User name"
          value={userName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setUserName(value);
          }}
        />
         <Input
          id="add-user-email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setEmail(value);
          }}
        />
        <div className="row">
          <Button
            type="dashed"
            onClick={async () => {
              const result = await axios.post(
                "/api/v1/users",
                {
                  eth_addr: ethAccount,
                  name: userName,
                  email: email,
                  uuid: "a-b-c-d"
                }
              );
              notify("user added successfully");
            }}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
