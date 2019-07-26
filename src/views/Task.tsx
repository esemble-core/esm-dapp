import React from 'react'
import Web3Provider from 'web3-react';
import useWeb3Config from '../components/chainstate/useWeb3Config';
import ShowTask from '../components/esm/projects/ShowTask';


export default function Task() {
  const web3Config = useWeb3Config();

  return (
    <div className="jumbotron">
      <div className="narrow">
        <div className="col-12">
          <h3 className="heading text-center">Task Details</h3>
          <div className="heading-underline"></div>
            <Web3Provider connectors={web3Config.connectors} libraryName={web3Config.libraryName} web3Api={web3Config.web3Api}> 
              <ShowTask />
            </Web3Provider>
        </div>
      </div>
    </div>
  )
}
