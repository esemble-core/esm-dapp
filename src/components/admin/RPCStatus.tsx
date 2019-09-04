import React from 'react'
import { Card } from 'antd';

export default function RPCStatus() {
  const [checkInterval, setCheckInterval] = React.useState(1000);
  const [rpcStatus, setRpcStatus] = React.useState(false);
  const divStyleUp = {color: 'green'};
  const divStyleDown = { color: 'red'};


  React.useEffect(() => {


    return () => {
      //killTimer
    };
  }, []);


  return (
    <div className="antDDefault">
      <Card title="RPC Status" bordered={false} >
        <p>Checking every {checkInterval} ms</p>
        <div>Status: {rpcStatus ?
            <span>up</span> :
            <span style={divStyleDown}>DOWN!</span>
          }
        </div>
      </Card>
    </div>
  );
}
