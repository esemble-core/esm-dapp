import { useContext, useEffect, useState } from 'react';
import useReactWeb3 from '../../chainstate/useReactWeb3';
import { Store } from '../../../common/Store';
import { async } from 'q';
import { fetchUserForEthAddr } from '../../../common/Actions';
import { IUser } from '../../../common/Interfaces';


export function useUser(){
  const { state, dispatch } = useContext(Store);
  const ethAccount = useReactWeb3();
  const [user, setUser] = useState<IUser| any>({})


  useEffect(() => {
    const loadUserForAcct = async() => {
      await fetchUserForEthAddr(dispatch, ethAccount);
    }
    loadUserForAcct();
  }, [ethAccount]);


  useEffect(() => {

      setUser(state.currentUser);
  }, [state.currentUser]);

  return user;
}