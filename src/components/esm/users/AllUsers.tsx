import React from 'react'
import { Card, List, Avatar } from 'antd';




export default function AllUsers(props:any) {
 
  const [usersArray, setUsersArray] = React.useState([]);

  React.useEffect(() => {
    console.log("loading from api");
    fetch('http://localhost:3210/api/v1/users')
      .then(response => response.json())
      .then(json => setUsersArray(json.data))
      .catch(error => console.error(error))
  }, []);


  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="All Users" bordered={false} >
      {JSON.stringify(usersArray)}
    </Card>
  </div>
  )
}


/*
 <List
          header="All Users"
          bordered
          dataSource={usersArray}
          renderItem={item => (
            <List.Item 
              key={item.eth_addr}
            >
              <p className="strong-p">{item.name}</p>    
              <p>{" | "}{item.ethAddr}</p>  
              <p>{" | is Provider > "}{JSON.stringify(item.isProvider)}</p>                     
            </List.Item>
          )}
        />    
*/