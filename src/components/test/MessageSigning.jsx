import React from 'react'
import { Card, Input, Button} from 'antd';
import useReactWeb3Library from '../chainstate/useReactWeb3Library';
import useReactWeb3 from '../chainstate/useReactWeb3';


export default function MessageSigning() {
  const [message, setMessage] = React.useState(''); 
  const [signature, setSignature] = React.useState('');
  const [verified, setVerified] = React.useState(false);

  const web3 = useReactWeb3Library();
  const ethAcct = useReactWeb3();
  
  return (
    <React.Fragment>
    <div className="antDDefault">
      <Card title="Sign and Recover Message" bordered={false}> 
        <Input
          id="sign-msg"
          className="form-control"
          placeholder="Enter text of message to sign"
          value={message}
          onChange={(e) => {
            const { value } = e.target;
            setMessage(value);
          }}
        />
        <Button
              type="dashed"
              onClick={async () => {
                console.log("signing message:", message);
                
                if (web3 !== null && ethAcct){
                /*  let tempHash = web3.utils.sha3(message);
                  console.log("sha3 hash for message:", tempHash);
                 // const acct = web3.eth.accounts[0];
                 
                 const accounts = web3.eth.accounts;
                 console.log("account", accounts);
                  const tempSig = await web3.eth.sign(message, ethAcct);      
                 setSignature(tempSig);
                  console.log("signature for message:", tempSig);
                  setVerified(false);
                */
                //const signed = await web3.eth.sign(message, ethAcct);
                let tempHash = web3.utils.sha3(message);
                const tempSig = await web3.eth.personal.sign(tempHash, ethAcct);
                setSignature(tempSig);
                } else {
                  console.error("either web3 or the ethAccount are not initilized correctly");
                }
              }}
            >
          Sign
        </Button>

      <div>
        <div>
          signature: {signature}
        </div>
        <div>
          verified: {verified ? 'Yes' : ''}
        </div>
        <Button
          type="dashed"
          onClick={async () => {
            console.log("recover message");
            //let signingAddress = web3.eth.accounts.recover(message, signature);
            let signingAddress = await web3.eth.personal.ecRecover(message, signature);
            console.log("signing address", signingAddress);
            console.log("current address", ethAcct);
            if (signingAddress===ethAcct){
              setVerified(true);
            }
          }}
        >
           Recover
        </Button>  
      </div>
      </Card>
    </div>
  </React.Fragment>
  )
}
