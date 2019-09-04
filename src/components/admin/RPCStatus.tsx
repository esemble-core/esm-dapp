import React from 'react'
import { Card } from 'antd';
import { rpcStatus } from '../../common/Actions';

export default function RPCStatus() {
  const [checkInterval, setCheckInterval] = React.useState(1000);
  const [rpcIsUp, setRpcIsUp] = React.useState(false);
  const divStyleUp = {color: 'green'};
  const divStyleDown = { color: 'red'};


  React.useEffect(() => {
    const checkStatus = async() => {
      console.log("checking status...");
      let status: boolean = await rpcStatus();
      setRpcIsUp(status);
    }

    checkStatus();

    return () => {
      //killTimer
    };
  }, []);


  return (
    <div className="antDDefault">
      <Card title="RPC Status" bordered={false} >
        <p>Checking every {checkInterval} ms</p>
        <div>Status: {rpcIsUp ?
            <span style={divStyleUp}>UP</span> :
            <span style={divStyleDown}>DOWN!</span>
          }
        </div>
      </Card>
    </div>
  );
}
