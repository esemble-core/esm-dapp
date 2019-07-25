import React from 'react'
import AllProjects from '../components/esm/projects/AllProjects';
import AddProjectToRPC from '../components/esm/projects/AddProjectToRPC';
import { Button, Card } from 'antd';
import Web3Provider from 'web3-react';
import useWeb3Config from '../components/chainstate/useWeb3Config';

export default function Projects() {
  const [propose, setPropose] = React.useState(false);
  const web3Config = useWeb3Config();

  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Projects</h3>
        <div className="heading-underline"></div>
        <Web3Provider connectors={web3Config.connectors} libraryName={web3Config.libraryName} web3Api={web3Config.web3Api}> 
          <AllProjects />
          <div style={{ background: "#ECECEC", padding: "30px" }}>
              <Button
              type="dashed"
              onClick={() => {
                setPropose(true);
              }}
              >
            Propose A Project
            </Button>
            </div>
          {propose ? <AddProjectToRPC /> : ''}
        </Web3Provider>
      </div>
    </div>
  </div>
  )
}
