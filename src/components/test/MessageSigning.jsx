import React from 'react'
import { Card, Input, Button} from 'antd';
import useReactWeb3Library from '../chainstate/useReactWeb3Library';
import useReactWeb3 from '../chainstate/useReactWeb3';


export default function MessageSigning() {
  const [message, setMessage] = React.useState(''); 
  
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
                
                if (web3 !== null){
                  let temp = web3.utils.sha3(message);
                  console.log("sha3 hash for message:", temp);
                  const signature = await web3.eth.personal.sign(temp, ethAcct);
                  console.log("signature for message:", signature);
                  setMessage('');
                }
              }}
            >
          Sign
        </Button>

      <div>
        <Button
          type="dashed"
          onClick={async () => {
            console.log("recover message");
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
