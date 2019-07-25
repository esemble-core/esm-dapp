import React from 'react'
import ShowProject from '../components/esm/projects/ShowProject';
import useWeb3Config from '../components/chainstate/useWeb3Config';
import Web3Provider from 'web3-react';

export default function Project(props:any) {
  const web3Config = useWeb3Config();

  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Project Details</h3>
        <div className="heading-underline"></div>
          <Web3Provider connectors={web3Config.connectors} libraryName={web3Config.libraryName} web3Api={web3Config.web3Api}> 
            <ShowProject />
          </Web3Provider>
      </div>
    </div>
  </div>
  )
}
