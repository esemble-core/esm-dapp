import React from 'react'
import useReactWeb3 from '../../chainstate/useReactWeb3';
import { Store } from '../../../common/Store';
import { IUser } from '../../../common/Interfaces';
import ShowUserDetails from './ShowUserDetails';
import AddUserToRPC from './AddUserToRPC';
import { useUser } from './useUser';



export default function ShowAndAddUser() {
  const ethAcct = useReactWeb3();
  const [noUser, setNoUser] = React.useState(false);
  const {state, dispatch} = React.useContext(Store);
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
