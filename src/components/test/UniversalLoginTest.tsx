import React from 'react'
import { Card, Button } from 'antd';
import { notify } from '../../common/Actions';
import UniversalLoginSDK from '@universal-login/sdk';
import ethers from 'ethers';


export default function UniversalLoginTest() {
  const [output, setOutput] = React.useState('');
  const RELAYER_URL = 'http://localhost:3311';
  const JSON_RPC_URL = 'http://localhost:18545';
  //const relayerUrl = 'https://relayer.universallogin.io';
  //const jsonRpcUrl = 'https://ropsten.infura.io';
  const CONTRACT_ADDRESS = '0x0E2365e86A50377c567E1a62CA473656f0029F1e';

  return (
    <React.Fragment>
    <div className="antDDefault">
      <Card title="Universal Login" bordered={false}> 
        <Button
              type="dashed"
              onClick={async () => {
                console.log("generating and deploying");
                notify("connecting to local sdk instance");
               
                //const universalLoginSDK = new UniversalLoginSDK('http://localhost:3311', 'http://localhost:18545');
                //const [privateKey, contractAddress] = await universalLoginSDK.create

                const sdk = new UniversalLoginSDK(RELAYER_URL, JSON_RPC_URL);
                //const universalLoginSDK = new UniversalLoginSDK(relayerUrl, jsonRpcUrl);
                sdk.start();

                const privateKey = await sdk.connect(CONTRACT_ADDRESS);
                console.log("privatekey" + JSON.stringify(privateKey));
                
                /*const privateKeyString: string = JSON.stringify(privateKey);

                const key = new ethers.Wallet(privateKeyString).address;
                const filter =
                  {
                    contractAddress: CONTRACT_ADDRESS,
                    key
                  };

                const subscription = sdk.subscribe(
                  'KeyAdded',
                  filter,
                    (keyInfo: any) =>
                    {
                      console.log(`${keyInfo.key} now has permission to manage wallet contract`);
                  });

                */

                
              }}
            >
          Generate and Deploy
        </Button>

        <div style={{margin:20}}>
          {output}
        </div>
      </Card>
    </div>
  </React.Fragment>
  )
}
