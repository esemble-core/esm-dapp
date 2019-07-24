import { useContext, useEffect, useState } from 'react';
import useReactWeb3 from '../../chainstate/useReactWeb3';
import { Store } from '../../../common/Store';
import { fetchUserForEthAddr } from '../../../common/Actions';
import { IUser } from '../../../common/Interfaces';


export default function useLoadUser(){
  const { state, dispatch } = useContext(Store);
  const ethAccount = useReactWeb3();

  useEffect(() => {
    const loadUserForAcct = async() => {
      await fetchUserForEthAddr(dispatch, ethAccount);
    }
    loadUserForAcct();
  }, [ethAccount]);
}