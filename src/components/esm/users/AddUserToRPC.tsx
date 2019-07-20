import React from "react";
import useReactWeb3 from "../../chainstate/useReactWeb3";
import axios from "axios";
import { Card, Input, Button } from "antd";
import { notify } from "../../../common/Actions";


export default function AddUserToRPC() {
  const ethAccount = useReactWeb3();
  const [userName, setUserName] = React.useState("");

  
  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Card title="Add User" bordered={false}>
        <p className="strong-p">Enter details for new user</p>
        <Input
          id="add-user-input"
          className="form-control"
          placeholder="User name"
          value={userName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setUserName(value);
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
                  uuid: "a-b-c-d"
                }
              );
              notify("user added successfully");
            }}
          >
            Create User
          </Button>
        </div>
      </Card>
    </div>
  );
}
