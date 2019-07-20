import React from 'react';
import useReactWeb3 from '../../chainstate/useReactWeb3';
import Axios from 'axios';
import { IUser } from '../../../common/Interfaces';


export function useUser(){
  const [user, setUser] = React.useState<IUser | any>({});
  const ethAccount = useReactWeb3();

  React.useEffect(() => {
    const getUser = async () => {
      console.log("getting user for acct:", ethAccount);
      const result = await Axios(
        `/api/v1/usersearch?eth_addr=${ethAccount}`
      );

      if (result.data.status==='SUCCESS') {
        setUser(result.data.data);
      }else{
        setUser({});
      }
    };

    if (ethAccount) {
      getUser();
    }
  }, [ethAccount]);

  return user;
}