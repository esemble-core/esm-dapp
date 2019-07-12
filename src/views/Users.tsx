import React from 'react'
import ShowUserAccount from '../components/esm/users/ShowUserAccount';
import AddUserToSideChain from '../components/esm/users/AddUserToSideChain';
import AllUsers from '../components/esm/users/AllUsers';
import useWeb3Config from '../components/chainstate/useWeb3Config';
import Web3Provider from 'web3-react';
import LogUsers from '../components/esm/users/LogUsers';


export default function Users() {
  const web3Config = useWeb3Config();

  return (
    <div className="offset">
      <div className="jumbotron">
        <div className="narrow">
          <div className="col-12">
            <h3 className="heading text-center">Users</h3>
            <div className="heading-underline"></div>      
              <div className="container mydisplay-container">
              <Web3Provider connectors={web3Config.connectors} libraryName={web3Config.libraryName} web3Api={web3Config.web3Api}> 
                  <LogUsers />
                  <ShowUserAccount />
                  <AddUserToSideChain />
                  <AllUsers />    
                </Web3Provider>   
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*

 
                  

                  */
