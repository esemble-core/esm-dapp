import React from 'react'
import { IUser } from '../../../common/Interfaces';

export default function ShowUserDetails(props:any) {
  const user: IUser = props.user;
  const ethAcct: string = props.ethAcct;

  return (
    <React.Fragment>
     <p>show user details</p>
     <p>ETH address:{ethAcct}</p>
     <p>name:{user.name}</p>
    </React.Fragment>
  )
}
