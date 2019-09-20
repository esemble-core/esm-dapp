import React from 'react';
import Web3 from 'web3';
import Portis from '@portis/web3';
import { Button } from 'antd';
const PORTIS_DAPP_KEY = '4eebf5aa-26bb-4d6e-b277-7cc52b9628c7';
const ETH_NETWORK_STR = 'rinkeby';



export default function MetaTest() {
  //const portis = new Portis(PORTIS_DAPP_KEY, ETH_NETWORK_STR);
  //const web3 = new Web3(portis.provider);
  const portis = new Portis(PORTIS_DAPP_KEY, ETH_NETWORK_STR, { gasRelay: true });
  

  return (  
  <div className="jumbotron">
  <div className="narrow">
    <div className="col-12">
      <h3 className="heading text-center">Meta Tests</h3>
      <div className="heading-underline"></div>
        <React.Fragment>
          <Button
            type="ghost"
            onClick={async()=> {
              console.log("showing portis");
              await portis.showPortis()
              //const web3 = new Web3(portis.provider);

              portis.onLogin((walletAddress, email, reputation) => {
                console.log(walletAddress, email, reputation);
              });
            }}
            >
            Show Portis
          </Button>

          <Button
            type="ghost"
            onClick={()=> {
              console.log("showing account");
              portis.showPortis();
            }}
            >
            See Account
          </Button>

          <Button
            type="ghost"
            onClick={()=> {
              console.log("logging out");
              portis.logout();
            }}
            >
            Logout
          </Button>
        </React.Fragment>
        
      </div>
    </div>
  </div>
   
  )
}
