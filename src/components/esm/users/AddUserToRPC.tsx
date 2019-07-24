import React from "react";
import useReactWeb3 from "../../chainstate/useReactWeb3";
import { Card, Input, Button } from "antd";
import { IUser } from './../../../common/Interfaces';
import { addUser } from "../../../common/Actions";
import { Store } from "../../../common/Store";


export default function AddUserToRPC() {
  const ethAccount = useReactWeb3();
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { dispatch } = React.useContext(Store);

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
              let user: IUser = {
                name: userName,
                email: email,
                eth_addr: ethAccount
              }
             await addUser(dispatch, user);
            }}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
