import React from 'react'
import { IUser } from '../../../common/Interfaces';
import { Card } from 'antd';

export default function ShowUserDetails(props:any) {
  const user: IUser = props.user;
  const ethAcct: string = props.ethAcct;

  return (
    <div className="antDDefault">
      <Card title="Profile" bordered={false}>
        <p>ETH address:{ethAcct}</p>
        <p>name:{user.name}</p>
        <p>email:{user.email}</p>
      </Card>
    </div>
  )
}
