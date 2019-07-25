import React from 'react'
import useReactWeb3 from '../../chainstate/useReactWeb3';
import { Store } from '../../../common/Store';
import { IUser } from '../../../common/Interfaces';
import ShowUserDetails from './ShowUserDetails';
import AddUserToRPC from './AddUserToRPC';
import useLoadUser from './useLoadUser';



export default function ShowAndAddUser() {
  const ethAcct = useReactWeb3();
  const [noUser, setNoUser] = React.useState(false);
  const {state } = React.useContext(Store);

  useLoadUser();
  const user:IUser = state.currentUser;

  console.log("user currently logged in is:", user);


  React.useEffect(() => {
    console.log("ShowAndAddUser().useEffect([user, user.id]...user:", user);
    if (!user.name){
      setNoUser(true);
    }else {
      setNoUser(false);
    }
  }, [user.name]);


  
  return (
    <React.Fragment>
      <ShowUserDetails user={user} ethAcct={ethAcct} />
      {noUser ? <AddUserToRPC/> : ''}
    </React.Fragment>
  )
}
