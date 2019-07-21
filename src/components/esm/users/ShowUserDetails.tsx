import React from 'react'
import { IUser } from '../../../common/Interfaces';
import { Card } from 'antd';

export default function ShowUserDetails(props:any) {
  const user: IUser = props.user;
  const ethAcct: string = props.ethAcct;

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Card title="Profile" bordered={false}>
        <p>show user details</p>
        <p>ETH address:{ethAcct}</p>
        <p>name:{user.name}</p>
      </Card>
    </div>
  )
}
