import React from 'react'
import useReactWeb3 from '../../chainstate/useReactWeb3';
import { useUser } from './useUser';
import AddUserToRPC from './AddUserToRPC';
import { IUser } from './../../../common/Interfaces';
import ShowUserDetails from './ShowUserDetails';
import { Card } from 'antd';


export default function ShowAndAddUser() {
  const [noUser, setNoUser] = React.useState(false);
  const ethAcct = useReactWeb3();
  const user: IUser = useUser();
  
  React.useEffect(() => {
    if (!user.id){
      setNoUser(true);
    }else {
      setNoUser(false);
    }
  }, [user.id]);

  
  console.log("user currently logged in is:", user);
  return (
    <React.Fragment>
      <ShowUserDetails user={user} ethAcct={ethAcct} />
      {noUser ? <AddUserToRPC/> : ''}
    </React.Fragment>
  )
}
