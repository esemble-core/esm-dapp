import React from 'react';
import Portis from '@portis/web3';
import { Button } from 'antd';
const PORTIS_DAPP_KEY = '4eebf5aa-26bb-4d6e-b277-7cc52b9628c7';
const ETH_NETWORK_STR = 'rinkeby';


export default function MetaTest() {
  const portis = new Portis(PORTIS_DAPP_KEY, ETH_NETWORK_STR);


  return (  
  <div className="jumbotron">
  <div className="narrow">
    <div className="col-12">
      <h3 className="heading text-center">Admin</h3>
      <div className="heading-underline"></div>
        <React.Fragment>
          <Button
            type="ghost"
            onClick={()=> {
              console.log("showing portis");
              portis.showPortis();
            }}
            >
            Show Portis
          </Button>
        </React.Fragment>
        
      </div>
    </div>
  </div>
   
  )
}


/*

"web3": "1.0.0-beta.34",

*/